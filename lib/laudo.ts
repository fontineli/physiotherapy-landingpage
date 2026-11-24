// Tradutor de laudo da coluna: lógica pura (roda no navegador, nada é enviado).
// O parser só entende laudo em português; por isso o conteúdo médico fica aqui
// em PT (como o conteúdo da /guia), e só o texto de interface vai pro messages.

export type Pill = "calm" | "depends" | "attn"

export type Finding = {
  id: string
  /** nome */
  n: string
  /** palavras-chave (texto já normalizado: sem acento, minúsculo) */
  k: RegExp[]
  p: Pill
  /** rótulo da pílula */
  pl: string
  /** achado que pode irritar nervo */
  nerve?: boolean
  /** o que é */
  o: string
  /** o que você pode sentir */
  s: string
  /** é grave? */
  g: string
}

export const FINDINGS: Finding[] = [
  {
    id: "seq", n: "Sequestro discal", k: [/sequestr/, /fragmento (discal )?(livre|migrad)/, /migrad/], p: "attn", pl: "Precisa de acompanhamento", nerve: true,
    o: "Um pedaço do disco saiu e se soltou por completo.",
    s: "Costuma dar dor forte descendo pela perna, formigamento e, às vezes, fraqueza no pé ou na perna.",
    g: "Assusta no papel, mas é um dos tipos com maior chance de o corpo reabsorver com o tempo. Precisa de acompanhamento de perto, principalmente se houver perda de força.",
  },
  {
    id: "ext", n: "Extrusão discal", k: [/extrus/, /extruid/], p: "depends", pl: "Depende dos sintomas", nerve: true,
    o: "O miolo do disco rompeu o anel de fora e saiu, como pasta de dente saindo do tubo.",
    s: "É o tipo que mais irrita o nervo: dor que desce pela perna (às vezes mais forte que a das costas), formigamento, queimação ou choque ao tossir e espirrar.",
    g: "Pode doer bastante na crise, mas costuma melhorar com o tempo. É um dos tipos que o corpo mais consegue reabsorver.",
  },
  {
    id: "pro", n: "Protrusão discal", k: [/protrus/], p: "depends", pl: "Depende dos sintomas", nerve: true,
    o: "O miolo do disco empurrou o anel num ponto e formou uma saliência. É uma hérnia pequena: o miolo continua dentro do disco.",
    s: "Pode não dar nada. Se a saliência encostar no nervo, pode dar dor que desce pela perna, formigamento ou queimação no caminho desse nervo. Se não encostar, o mais comum é dor e rigidez na lombar.",
    g: "É muito comum, inclusive em quem não sente dor. O que importa é se ela combina com os seus sintomas.",
  },
  {
    id: "her", n: "Hérnia de disco", k: [/herni(a|ac|ad)(?! intra)/], p: "depends", pl: "Depende dos sintomas", nerve: true,
    o: "Parte do disco saiu do lugar. É o nome geral para protrusão, extrusão e sequestro.",
    s: "Pode não dar nada, dar dor lombar ou, se encostar no nervo, dor que desce pela perna com formigamento.",
    g: "Muita gente tem hérnia no exame e nenhum sintoma. Ela só tem significado quando conversa com o que você sente.",
  },
  {
    id: "aba", n: "Abaulamento discal", k: [/abaulament/, /abaulad/, /bulging/], p: "calm", pl: "Muito comum",
    o: "O disco se espalhou um pouco, por igual, além da borda da vértebra. O anel de fora continua inteiro.",
    s: "Na maioria das vezes, nada. Quando dá sintoma, costuma ser dor ou rigidez na lombar que piora ficando muito tempo na mesma posição.",
    g: "É um dos achados mais comuns depois dos 30 anos, inclusive em quem não tem dor.",
  },
  {
    id: "comp", n: "O disco encosta ou aperta o nervo",
    k: [/compress/, /comprim/, /contato/, /tocando/, /\btoca(m)? (a|as|o|os|na|no)\b/, /deslocando/, /desloca (a|as|o|os) raiz/, /insinua/, /molda(ndo)?/, /impressao sobre/, /obliter/, /apagamento da gordura/],
    p: "depends", pl: "Depende dos sintomas", nerve: true,
    o: "Algo (geralmente o disco) está encostando (contato) ou apertando (compressão) a raiz do nervo ou o saco onde ficam os nervos.",
    s: "É aqui que a dor costuma descer pela perna: dor, formigamento, dormência, queimação ou choque no caminho do nervo. Pode piorar sentado, ao tossir ou ao se curvar.",
    g: "Contato, muitas vezes, não dá sintoma nenhum. Compressão importa mais, principalmente se vier com perda de força.",
  },
  {
    id: "for", n: "Forame estreitado (estenose foraminal)",
    k: [/(estenose|redu\w*|estreit\w*|diminu\w*|compromet\w*)\s+(\w+\s+){0,4}(neuro)?forame/, /(neuro)?forame\w*\s+(\w+\s+){0,3}(estreit|reduz|redu|diminu)/, /estenose (neuro)?foraminal/],
    p: "depends", pl: "Depende dos sintomas", nerve: true,
    o: "A passagem lateral por onde o nervo sai da coluna (o forame) ficou mais estreita.",
    s: "Dor que desce pela perna de um lado só, que costuma piorar ao inclinar o corpo para trás ou para o lado da dor, e aliviar ao se curvar para frente.",
    g: "Pode irritar o nervo, mas sozinho não confirma isso. Precisa combinar com o que você sente.",
  },
  {
    id: "can", n: "Canal estreitado (estenose do canal)",
    k: [/estenose (do canal|central|de canal|vertebral)/, /(redu\w*|estreit\w*|diminu\w*)\s+(\w+\s+){0,4}canal/, /canal (vertebral )?(estreit|reduz)/],
    p: "depends", pl: "Depende dos sintomas", nerve: true,
    o: "O canal por onde passam os nervos ficou mais estreito.",
    s: "Pernas pesadas, cansadas, dormentes ou doloridas ao caminhar, que melhoram quando você senta ou inclina o tronco para frente, como ao empurrar um carrinho de mercado.",
    g: "Muita gente tem sem sintoma nenhum. Quando dá sintoma, costuma responder bem a tratamento com exercício.",
  },
  {
    id: "lis", n: "Vértebra escorregada (espondilolistese)", k: [/listese/], p: "depends", pl: "Depende do grau",
    o: "Uma vértebra escorregou um pouco sobre a de baixo. O grau (I a IV) mostra o quanto.",
    s: "Dor lombar que piora em pé ou ao inclinar para trás e sensação de coluna instável. Às vezes, dor ou cansaço nas pernas ao caminhar.",
    g: "O grau I é o mais comum e costuma ser tratado com exercício e fortalecimento. Graus maiores pedem acompanhamento mais próximo.",
  },
  {
    id: "cis", n: "Cisto sinovial", k: [/cisto sinovial/, /cistos sinoviais/], p: "depends", pl: "Depende dos sintomas", nerve: true,
    o: "Uma bolsinha de líquido que nasce numa articulação de trás da coluna.",
    s: "Se encostar no nervo, pode dar dor que desce pela perna. Se não encostar, geralmente nada.",
    g: "Precisa combinar com os sintomas para ter importância.",
  },
  {
    id: "mod", n: "Alterações de Modic", k: [/modic/], p: "depends", pl: "Depende do tipo",
    o: "Mudanças no osso da vértebra bem perto do disco.",
    s: "O tipo 1 pode estar ligado a dor lombar mais constante, inclusive à noite e ao acordar. O tipo 2 é muito comum e costuma ser estável.",
    g: "Vale conversar com quem avalia o seu caso, principalmente no tipo 1.",
  },
  {
    id: "fac", n: "Desgaste das articulações de trás (artrose facetária)", k: [/facetar/, /interapofis/, /espondiloartros/, /artrose/, /hipertrofia (das )?facet/], p: "calm", pl: "Muito comum",
    o: "Desgaste das pequenas articulações que ficam atrás, entre uma vértebra e outra.",
    s: "Dor na lombar que piora ao inclinar para trás ou ficar muito tempo em pé, e rigidez ao acordar que melhora com o movimento. Pode irradiar para o bumbum, mas geralmente não passa do joelho.",
    g: "É comum com a idade e costuma melhorar bem com movimento e fortalecimento.",
  },
  {
    id: "lig", n: "Ligamento amarelo mais grosso", k: [/ligamento(s)? amarelo/, /flavo/], p: "calm", pl: "Geralmente tranquilo",
    o: "Um ligamento que fica atrás do canal ficou mais espesso.",
    s: "Sozinho, quase nada. Junto com outras alterações, pode estreitar o canal e deixar as pernas pesadas ao caminhar.",
    g: "Faz parte do envelhecimento da coluna.",
  },
  {
    id: "ost", n: "Bico de papagaio (osteófitos)", k: [/osteofit/, /bico(s)? de papagaio/], p: "calm", pl: "Muito comum",
    o: "Pontinhas de osso que crescem na borda da vértebra. É uma forma de o corpo dar mais estabilidade.",
    s: "A maioria não dói. Se estreitar a passagem de um nervo, pode dar dor ou formigamento na perna.",
    g: "Muito comum depois dos 40 anos.",
  },
  {
    id: "des", n: "Disco desidratado", k: [/desidrat/, /hipossinal/, /hipointens/, /perda (do|de) sinal/, /sinal reduzido/], p: "calm", pl: "Muito comum",
    o: "O disco perdeu parte da água e aparece mais escuro no exame.",
    s: "Sozinho, normalmente não causa dor. É como o cabelo branco da coluna.",
    g: "Faz parte do envelhecimento normal e é muito comum a partir dos 30 anos.",
  },
  {
    id: "deg", n: "Desgaste do disco (discopatia degenerativa)", k: [/degenera/, /discopatia/, /espondilose/, /espondilodiscopatia/, /desgaste/], p: "calm", pl: "Muito comum",
    o: "Sinais de desgaste do disco com o tempo, como perda de água e de altura.",
    s: "Pode não dar nada. Quando dá, costuma ser rigidez e dor lombar que melhoram com o movimento.",
    g: "O nome assusta, mas descreve mudanças comuns com a idade. Não é sentença de dor nem de piora.",
  },
  {
    id: "fis", n: "Pequena fissura no disco (fissura anular)", k: [/fissura/, /rotura/, /hiperintensidade (do|no) (anel|anulo)/], p: "calm", pl: "Geralmente tranquilo",
    o: "Uma pequena rachadura no anel de fora do disco.",
    s: "Muitas vezes nada. Às vezes dor lombar que piora ao ficar muito tempo sentado.",
    g: "Costuma cicatrizar. Rotura, aqui, não quer dizer que o disco rompeu de vez.",
  },
  {
    id: "alt", n: "Disco mais baixo", k: [/redu\w* (do espaco|da altura|do espaco discal|dos espacos)/, /diminui\w* (do espaco|da altura)/, /pincamento/, /espaco discal reduzido/], p: "calm", pl: "Muito comum",
    o: "O disco ficou mais baixo e as vértebras ficaram mais próximas.",
    s: "Pode dar sensação de coluna travada ao acordar. Sozinho, não define quanta dor você sente.",
    g: "É comum com o passar dos anos.",
  },
  {
    id: "ret", n: "Lombar mais reta (retificação da lordose)", k: [/retifica/, /(redu\w*|perda|diminui\w*) da lordose/, /hipolordose/], p: "calm", pl: "Muito comum",
    o: "A curva natural da lombar está menos acentuada no exame.",
    s: "Normalmente nada específico. Muitas vezes é só a posição na hora do exame ou músculos contraídos pela dor.",
    g: "Raramente é a causa da dor sozinha.",
  },
  {
    id: "esc", n: "Escoliose", k: [/escolio/, /desvio lateral/, /convexidade/], p: "depends", pl: "Depende do grau",
    o: "A coluna faz uma curva para o lado.",
    s: "Curvas leves geralmente não doem. Pode dar cansaço ou dor muscular de um lado das costas.",
    g: "Curvas leves são comuns. Curvas maiores pedem acompanhamento.",
  },
  {
    id: "mus", n: "Músculos da coluna mais fracos (lipossubstituição)", k: [/lipossubstitu/, /liposubstitu/, /substituicao (gordurosa|adiposa)/, /infiltracao (gordurosa|adiposa)/, /atrofia/], p: "calm", pl: "Responde bem a exercício",
    o: "Os músculos que seguram a coluna perderam volume e ganharam um pouco de gordura no meio.",
    s: "Sensação de coluna fraca ou cansada e dor que piora no fim do dia ou depois de esforço.",
    g: "É um dos achados que mais respondem a fortalecimento bem orientado.",
  },
  {
    id: "sch", n: "Nódulo de Schmorl", k: [/schmorl/, /intraesponjos/], p: "calm", pl: "Geralmente tranquilo",
    o: "Uma pequena entrada do disco para dentro do osso da vértebra.",
    s: "Geralmente nada.", g: "Na maioria das vezes, é um achado sem importância.",
  },
  {
    id: "hem", n: "Hemangioma", k: [/hemangioma/], p: "calm", pl: "Geralmente tranquilo",
    o: "Uma pequena área de vasos sanguíneos dentro da vértebra.",
    s: "Na grande maioria das vezes, nada.", g: "É benigno e muito comum. Quase nunca precisa de tratamento.",
  },
  {
    id: "tar", n: "Cisto de Tarlov", k: [/tarlov/, /cisto(s)? perineura/], p: "calm", pl: "Geralmente tranquilo",
    o: "Pequenas bolsinhas de líquido em volta das raízes no sacro.",
    s: "Geralmente nada.", g: "São comuns e, na maioria das vezes, sem importância.",
  },
  {
    id: "fra", n: "Fratura", k: [/fratura/, /acunhamento/], p: "attn", pl: "Fale com o seu médico",
    o: "Uma quebra ou achatamento de uma vértebra.",
    s: "Dor forte e bem localizada nas costas, que piora com o movimento.",
    g: "Precisa de avaliação médica para entender a causa e o cuidado certo.",
  },
]

export type Root = "L2" | "L3" | "L4" | "L5" | "S1"

export const ROOT_FEEL: Record<Root, string> = {
  L2: "Virilha e frente da coxa.",
  L3: "Frente e parte de dentro da coxa, até o joelho.",
  L4: "Frente da coxa, joelho e parte de dentro da canela, às vezes até o tornozelo.",
  L5: "Lateral da coxa e da canela, peito do pé e dedão.",
  S1: "Parte de trás da coxa e da panturrilha, calcanhar, sola e borda de fora do pé, até o dedinho.",
}

export const EXAMPLE =
  "Protrusão discal posteromediana e foraminal esquerda em L4-L5, tocando a raiz de L5 à esquerda. Abaulamento discal em L5-S1. Desidratação dos discos L4-L5 e L5-S1. Osteófitos marginais. Retificação da lordose lombar."

// Frases negadas ("sem compressão", "não há hérnia") saem do texto antes de buscar achados.
const NEG =
  /(sem|nao (ha|se (observa|evidencia|identifica)m?)|ausencia de|nao (foram )?(observad|identificad|evidenciad)\w*)\s+(\w+\s+){0,3}?(sinais? de |evidencias? de )?(compress\w*|contato\w*|estenose\w*|herni\w*|protrus\w*|extrus\w*|conflito\w*|repercuss\w*|abaulament\w*|fratura\w*|listese\w*)[^.;]*/g

// raiz que sai abaixo de cada nível (hérnia central/paramediana)
const ROOT_BELOW: Record<string, Root | undefined> = { L1: "L2", L2: "L3", L3: "L4", L4: "L5", L5: "S1" }

const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase()

function levelsIn(t: string): string[] {
  const out: string[] = []
  const re = /\bl\s?([1-5])\s*(?:[-/–]|e)?\s*(?:l\s?([1-5])|(s)\s?1)\b/g
  let m: RegExpExecArray | null
  while ((m = re.exec(t))) {
    const lv = `L${m[1]}-${m[3] ? "S1" : `L${m[2]}`}`
    if (!out.includes(lv)) out.push(lv)
  }
  return out
}

export type Side = "both" | "right" | "left" | null

export type Result = {
  list: { finding: Finding; levels: string[] }[]
  /** laudo diz explicitamente que não há compressão de nervo */
  good: boolean
  roots: Root[]
  nerveLevels: string[]
  side: Side
}

export function translate(raw: string): Result {
  const t = norm(raw).replace(/\s+/g, " ")
  const negHits = t.match(NEG) ?? []
  const good = negHits.some((h) => /compress|contato|conflito|repercuss/.test(h))
  const sentences = t.replace(NEG, " ").split(/[.;\n]/)

  const found = FINDINGS.flatMap((finding) => {
    const sent = sentences.filter((s) => finding.k.some((r) => r.test(s)))
    return sent.length ? [{ finding, levels: [...new Set(sent.flatMap(levelsIn))] }] : []
  })
  // "hérnia" genérica só aparece se não houver o tipo específico
  const specific = found.some((f) => ["pro", "ext", "seq"].includes(f.finding.id))
  const list = found.filter((f) => !(f.finding.id === "her" && specific))

  const nerveSent = sentences.filter((s) => FINDINGS.some((x) => x.nerve && x.k.some((r) => r.test(s))))
  const nerveText = nerveSent.join(" ")
  const nerveLevels = [...new Set(nerveSent.flatMap(levelsIn))]
  // foraminal pega a raiz do próprio nível; central pega a de baixo
  const foraminal = /foramin|forame/.test(nerveText) && !/central|mediana/.test(nerveText)
  let roots = [
    ...new Set(
      nerveLevels.map((l) => {
        const top = l.split("-")[0]
        return foraminal ? (top as Root) : ROOT_BELOW[top]
      })
    ),
  ].filter((r): r is Root => !!r && r in ROOT_FEEL)
  const explicit = [
    ...new Set((nerveText.match(/raiz(es)? (de |do |da )?(l[1-5]|s1)/g) ?? []).map((m) => m.slice(-2).toUpperCase())),
  ].filter((r): r is Root => r in ROOT_FEEL)
  if (explicit.length) roots = explicit

  const right = /direit/.test(nerveText)
  const left = /esquerd/.test(nerveText)
  const side: Side = (right && left) || /bilateral/.test(nerveText) ? "both" : right ? "right" : left ? "left" : null

  return { list, good, roots, nerveLevels, side }
}
