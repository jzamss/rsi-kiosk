import React from "react";
import { PageFlow } from "rsi-react-components";
import {
  EmailVerification,
  EPayment,
  usePartnerFromLocation,
} from "rsi-react-filipizen";

import InitialInfo from "./InitialInfo";
import OnlineBilling from "./OnlineBilling";

const pages = [
  { name: "verification", caption: "Verification", Component: EmailVerification,},
  { name: "initial", caption: "Initial Information", Component: InitialInfo },
  { name: "billing", caption: "Billing Information", Component: OnlineBilling },
  { name: "payment", caption: "Payment", Component: EPayment },
];

const RptBillingController = (props) => {
  const { location } = props;
  const [partner] = usePartnerFromLocation(location);

  return (
    <PageFlow
      title="Online Realty Tax Billing"
      initialData={{
        origin: "filipizen",
        txntype: "rptcol",
        refno: null,
        contact: {},
        bill: {},
        po: {},
      }}
      {...props}
      partner={partner}
      pages={pages}
    />
  );
};

export default RptBillingController;
