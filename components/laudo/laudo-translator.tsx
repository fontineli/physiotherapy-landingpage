"use client"

import { useEffect, useRef, useState } from "react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { track } from "@/lib/analytics"
import { WHATSAPP_LAUDO_URL } from "@/lib/config"
import { EXAMPLE, ROOT_FEEL, translate, type Result, type Root } from "@/lib/laudo"

const strong = (chunks: React.ReactNode) => <strong>{chunks}</strong>

export function LaudoTranslator() {
  const t = useTranslations("laudo")
  const [text, setText] = useState("")
  const [msg, setMsg] = useState<"empty" | "notFound" | null>(null)
  const [result, setResult] = useState<Result | null>(null)
  const boxRef = useRef<HTMLTextAreaElement>(null)
  const resultRef = useRef<HTMLElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const [ctaInView, setCtaInView] = useState(false)

  function run(raw: string, source: "input" | "example") {
    if (!raw.trim()) {
      setMsg("empty")
      setResult(null)
      boxRef.current?.focus()
      return
    }
    const r = translate(raw)
    track("laudo_translate", {
      source,
      findings: r.list.length,
      nerve: r.roots.length > 0,
      page: "laudo",
    })
    if (!r.list.length && !r.good) {
      setMsg("notFound")
      setResult(null)
      return
    }
    setMsg(null)
    setResult(r)
  }

  function reset() {
    setText("")
    setResult(null)
    setMsg(null)
    boxRef.current?.focus()
  }

  // rola até o resultado quando ele aparece
  useEffect(() => {
    if (result) resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [result])

  // barra fixa de WhatsApp: aparece com resultado na tela, some quando o CTA grande está visível
  useEffect(() => {
    const el = ctaRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setCtaInView(e.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [result])

  const showSticky = !!result && !ctaInView
  const isNerve = (p: string, nerve?: boolean) => nerve || p === "attn" || p === "depends"
  const nerveList = result?.list.filter((f) => isNerve(f.finding.p, f.finding.nerve)) ?? []
  const calmList = result?.list.filter((f) => !isNerve(f.finding.p, f.finding.nerve)) ?? []

  return (
    <>
      <div className="box">
        <label htmlFor="laudo">{t("form.label")}</label>
        <textarea
          id="laudo"
          ref={boxRef}
          spellCheck={false}
          placeholder={t("form.placeholder")}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        {msg && (
          <p className="msg" role="alert">
            {t.rich(`form.${msg}`, { strong })}
          </p>
        )}
        <button type="button" className="go" onClick={() => run(text, "input")}>
          {t("form.submit")}
        </button>
        <div className="row-links">
          <button
            type="button"
            className="linkbtn"
            onClick={() => {
              setText(EXAMPLE)
              run(EXAMPLE, "example")
            }}
          >
            {t("form.example")}
          </button>
          <button type="button" className="linkbtn" onClick={reset}>
            {t("form.clear")}
          </button>
        </div>
        <p className="privacy">{t("form.privacy")}</p>
      </div>

      {result && (
        <section className="result" ref={resultRef} aria-live="polite">
          <div className="r-head">
            <h2>{t("result.title")}</h2>
            <p>
              {t.rich("result.found", { count: result.list.length, strong })}
              {calmList.length > 0 && <> {t.rich("result.calm", { count: calmList.length, strong })}</>}
            </p>
          </div>

          {result.roots.length > 0 && (
            <div className="feel">
              <h3>{t("feel.title")}</h3>
              <p>
                {t("feel.text", {
                  levels: result.nerveLevels.join(t("feel.and")),
                  side: result.side ? t(`feel.side.${result.side}`) : "",
                })}
              </p>
              <div className="legs">
                <LegsMap roots={result.roots} label={t("feel.legsLabel")} front={t("feel.front")} back={t("feel.back")} />
                <div className="roots">
                  {result.roots.map((r) => (
                    <div className="root" key={r}>
                      <b>{t("feel.root", { root: r })}</b>
                      <span>{ROOT_FEEL[r]}</span>
                    </div>
                  ))}
                </div>
              </div>
              <p>{t("feel.after")}</p>
              <small>{t("feel.note")}</small>
            </div>
          )}

          {result.good && (
            <div className="good">
              <h4>{t("good.title")}</h4>
              <p>{t("good.text")}</p>
            </div>
          )}

          {nerveList.length > 0 && <h3 className="sec-t">{t("result.nerveSection")}</h3>}
          {nerveList.map((f) => (
            <FindingCard key={f.finding.id} item={f} />
          ))}
          {calmList.length > 0 && <h3 className="sec-t">{t("result.calmSection")}</h3>}
          {calmList.map((f) => (
            <FindingCard key={f.finding.id} item={f} />
          ))}

          <div className="alert">
            <h3>{t("alert.title")}</h3>
            <p>{t("alert.intro")}</p>
            <ul>
              {(["i1", "i2", "i3", "i4"] as const).map((k) => (
                <li key={k}>{t(`alert.${k}`)}</li>
              ))}
            </ul>
          </div>

          <div className="cta2" ref={ctaRef}>
            <span className="cta-tag">{t("cta.tag")}</span>
            <h3 className="cta-h">
              {t("cta.title1")}
              <br />
              <em>{t("cta.title2")}</em>
            </h3>
            <div className="cta-me">
              <div className="cta-photo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/laudo/dr-guilherme.jpg" alt={t("cta.photoAlt")} width={92} height={92} />
                <span className="live">
                  <i />
                  {t("cta.live")}
                </span>
              </div>
              <div>
                <strong>{t("cta.name")}</strong>
                <span>
                  {t("cta.role")}
                  <br />
                  {t("cta.cases")}
                </span>
              </div>
            </div>
            <p className="cta-p">{t("cta.text")}</p>
            <ul className="cta-list">
              {(["l1", "l2", "l3", "l4"] as const).map((k) => (
                <li key={k}>{t(`cta.${k}`)}</li>
              ))}
            </ul>
            <a
              className="bigbtn"
              href={WHATSAPP_LAUDO_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("whatsapp_click", { location: "laudo_cta", page: "laudo" })}
            >
              <WhatsIcon size={26} />
              <span className="t">
                {t("cta.button")}
                <small>{t("cta.buttonSub")}</small>
              </span>
            </a>
            <p className="cta-note">{t("cta.note")}</p>
            <div className="cta-or">
              <span>{t("cta.or")}</span>
            </div>
            <Link
              className="btn second"
              href="/guia"
              target="_blank"
              onClick={() => track("guia_click", { location: "laudo_cta", page: "laudo" })}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/laudo/guia-capa.jpg" alt="" width={44} height={44} />
              <span className="t">
                {t("cta.guide")}
                <small>{t("cta.guideSub")}</small>
              </span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <button type="button" className="linkbtn again" onClick={() => {
            reset()
            window.scrollTo({ top: 0, behavior: "smooth" })
          }}>
            {t("result.again")}
          </button>
        </section>
      )}

      <div className={`stickybar${showSticky ? " on" : ""}`} aria-hidden={!showSticky}>
        <a
          href={WHATSAPP_LAUDO_URL}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={showSticky ? 0 : -1}
          onClick={() => track("whatsapp_click", { location: "laudo_sticky", page: "laudo" })}
        >
          <WhatsIcon size={22} />
          {t("cta.sticky")}
        </a>
      </div>
    </>
  )
}

function FindingCard({ item }: { item: Result["list"][number] }) {
  const t = useTranslations("laudo.card")
  const { finding: f, levels } = item
  return (
    <article className={`card${f.nerve ? " nerve" : ""}`}>
      <div className="c-top">
        <h4>{f.n}</h4>
        {levels.length > 0 && <span className="where">{t("where", { levels: levels.join(", ") })}</span>}
      </div>
      <span className={`pill ${f.p}`}>{f.pl}</span>
      <div className="q big">
        <span className="l">{t("feel")}</span>
        <p>{f.s}</p>
      </div>
      <div className="q">
        <span className="l">{t("what")}</span>
        <p>{f.o}</p>
      </div>
      <div className="q">
        <span className="l">{t("serious")}</span>
        <p>{f.g}</p>
      </div>
    </article>
  )
}

// Perna de frente e de trás, com brilho nas áreas de cada raiz.
function LegsMap({ roots, label, front, back }: { roots: Root[]; label: string; front: string; back: string }) {
  const has = (r: Root) => roots.includes(r)
  const leg = (x: number, text: string, isFront: boolean) => {
    const zones: React.ReactNode[] = []
    if (isFront) {
      if (has("L2") || has("L3")) zones.push(<ellipse key="a" cx={x} cy={70} rx={15} ry={34} />)
      if (has("L3") || has("L4")) zones.push(<ellipse key="b" cx={x - 6} cy={128} rx={9} ry={14} />)
      if (has("L4")) zones.push(<ellipse key="c" cx={x - 9} cy={185} rx={7} ry={46} />)
      if (has("L5"))
        zones.push(
          <ellipse key="d" cx={x + 9} cy={178} rx={7} ry={50} />,
          <ellipse key="e" cx={x + 8} cy={246} rx={14} ry={6} />,
          <ellipse key="f" cx={x + 1} cy={244} rx={5} ry={5} />
        )
    } else {
      if (has("L5") || has("S1")) zones.push(<ellipse key="a" cx={x} cy={72} rx={9} ry={40} />)
      if (has("L5")) zones.push(<ellipse key="b" cx={x + 10} cy={168} rx={6} ry={38} />)
      if (has("S1"))
        zones.push(
          <ellipse key="c" cx={x} cy={165} rx={12} ry={40} />,
          <ellipse key="d" cx={x} cy={243} rx={10} ry={8} />,
          <ellipse key="e" cx={x + 12} cy={248} rx={6} ry={6} />
        )
    }
    const d = `M${x - 25} 18 C${x - 25} 14 ${x + 25} 14 ${x + 25} 18 L${x + 22} 112 C${x + 21} 124 ${x + 17} 130 ${x + 16} 136 C${x + 21} 165 ${x + 15} 198 ${x + 10} 228 L${x + 10} 238 C${x + 18} 242 ${x + 28} 244 ${x + 30} 250 L${x + 30} 255 L${x - 11} 255 L${x - 12} 238 L${x - 13} 228 C${x - 18} 198 ${x - 22} 165 ${x - 16} 136 C${x - 18} 130 ${x - 21} 124 ${x - 22} 112 Z`
    return (
      <g>
        <path d={d} fill="#2B2F38" stroke="#5B6575" strokeWidth={1.5} />
        <g fill="#E2574C" opacity={0.55} filter="url(#laudo-blur)">
          {zones}
        </g>
        {isFront ? (
          <ellipse cx={x} cy={124} rx={9} ry={7} fill="none" stroke="#5B6575" strokeWidth={1} />
        ) : (
          <path d={`M${x - 10} 132 q10 6 20 0`} fill="none" stroke="#5B6575" strokeWidth={1} />
        )}
        <text x={x} y={275} textAnchor="middle" fontSize={12} fill="#A8A398">
          {text}
        </text>
      </g>
    )
  }
  return (
    <svg viewBox="0 0 150 285" role="img" aria-label={label}>
      <defs>
        <filter id="laudo-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation={3} />
        </filter>
      </defs>
      {leg(40, front, true)}
      {leg(110, back, false)}
    </svg>
  )
}

function WhatsIcon({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1 2.7c.1.2 1.8 2.8 4.4 3.9 1.6.7 2.3.8 3.1.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.2-.3-.3-.5-.4Z"
      />
    </svg>
  )
}
