import { useTranslations } from "next-intl";
import Navbar from "@/components/Navbar";

export default function PrivacyPolicyPage() {
  const t = useTranslations("policyPrivacy");
  return (
    <main className="">
      <Navbar />
      <section className="w-full bg-white">
        <ol>
          <li className="p-4">
            <h1 className="text-2xl font-bold text-primary-100">
              {t("Title")}
            </h1>
            <p className="mt-2 text-primary-70">{t("Administration")}</p>
          </li>
          <li className="p-4">
            <h2 className="text-xl font-semibold text-primary-100">
              {t("CollectedDataTitle")}
            </h2>
            <p className="mt-2 text-primary-70">
              {t("CollectedDataDescription")}
            </p>
          </li>
          <li className="p-4">
            <h2 className="text-xl font-semibold text-primary-100">
              {t("DataShareTitle")}
            </h2>
            <p className="mt-2 text-primary-70">{t("DataShareDescription")}</p>
          </li>
          <li className="p-4">
            <h2 className="text-xl font-semibold text-primary-100">
              {t("ConsentToSharingDataTitle")}
            </h2>
            <p className="mt-2 text-primary-70">
              {t("ConsentToSharingDataDescription")}
            </p>
          </li>
          <li className="p-4">
            <h2 className="text-xl font-semibold text-primary-100">
              {t("DataRemovalTitle")}
            </h2>
            <p className="mt-2 text-primary-70">
              {t("DataRemovalDescription")}
            </p>
          </li>
          <li className="p-4">
            <h2 className="text-xl font-semibold text-primary-100">
              {t("PurposeOfDataCollectionTitle")}
            </h2>
            <p className="mt-2 text-primary-70">
              {t("PurposeOfDataCollectionDescription")}
            </p>
          </li>
          <li className="p-4">
            <h2 className="text-xl font-semibold text-primary-100">
              {t("DataSafetyTitle")}
            </h2>
            <p className="mt-2 text-primary-70">{t("DataSafetyDescription")}</p>
          </li>
          <li className="p-4">
            <h2 className="text-xl font-semibold text-primary-100">
              {t("RightToAccessCorrectAndDeleteDataTitle")}
            </h2>
            <p className="mt-2 text-primary-70">
              {t("RightToAccessCorrectAndDeleteDataDescription")}
            </p>
          </li>
          <li className="p-4">
            <h2 className="text-xl font-semibold text-primary-100">
              {t("LegalBasisTitle")}
            </h2>
            <p className="mt-2 text-primary-70">{t("LegalBasisDescription")}</p>
          </li>
          <li className="p-4">
            <p className="mt-2 text-primary-70">{t("TargetDescription")}</p>
          </li>
        </ol>
      </section>
    </main>
  );
}
