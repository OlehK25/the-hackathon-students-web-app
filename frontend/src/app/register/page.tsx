import * as React from "react";

import AppLayout from "@/components/layouts/AppLayout";
import FooterData from "@/components/footer/FooterData";
import MainRegister from "@/components/auth/MainRegister";

export default function RegisterPage() {
  return (
    <AppLayout>
      <MainRegister />

      <FooterData isVisible={false} />
    </AppLayout>
  );
}
