import type { Metadata } from "next"
import { Lora, Poppins } from "next/font/google"
import { getTranslations } from "next-intl/server"
import { HeroArt } from "@/components/laudo/hero-art"
import { LaudoTranslator } from "@/components/laudo/laudo-translator"
import { MainEngagementTracker } from "@/components/main-engagement-tracker"
import "@/components/laudo/laudo.css"

const BASE_URL = "https://doutorguilhermecarvalho.com"

const lora = Lora({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-lora" })
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-poppins" })

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "laudo.metadata" })
  const path = locale === "pt" ? "/laudo" : `/${locale}/laudo`

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${BASE_URL}${path}`,
      languages: { "pt-BR": `${BASE_URL}/laudo`, en: `${BASE_URL}/en/laudo` },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${BASE_URL}${path}`,
      siteName: "Dr. Guilherme Carvalho — Fisioterapeuta",
      locale: locale === "pt" ? "pt_BR" : "en_US",
      type: "website",
    },
  }
}

export default async function LaudoPage() {
  const t = await getTranslations("laudo")

  return (
    <div className={`laudo ${lora.variable} ${poppins.variable}`}>
      <main className="wrap">
        <header>
          <HeroArt />
          <span className="eyebrow">{t("eyebrow")}</span>
          <h1>{t("title")}</h1>
          <p className="lead">{t("lead")}</p>
        </header>
        <LaudoTranslator />
        <footer>
          <span>
            <strong>{t("footer.disclaimerStrong")}</strong> {t("footer.disclaimer")}
          </span>
          <span>{t("footer.credit")}</span>
        </footer>
      </main>
      <MainEngagementTracker page="laudo" />
    </div>
  )
}
