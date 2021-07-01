import React, { useState, useEffect } from "react";
import { Content, getUrlParameter, Service } from "rsi-react-components";
import { EPaymentError } from "rsi-react-filipizen";
import LguMasterTemplate from "../templates/LguMasterTemplate";

const PaymentError = (props) => {
  const history = props.history;
  const location = props.location || window.location;
  const [partner, setPartner] = useState({});

  useEffect(() => {
    const loadPartner = () => {
      const orgcode = getUrlParameter(location, "orgcode");
      const svc = Service.lookup("CloudPartnerService", "partner");
      svc.invoke("findById", { id: orgcode }, (err, partner) => {
        if (!err) {
          setPartner(partner);
        } else {
          setPartner({});
        }
      });
    };
    if (location) {
      loadPartner();
    }
  }, [location]);

  const gotoPartnerService = () => {
    if (partner && partner.name) {
      history.replace({
        pathname: `/partner/${partner.name}/services`,
        state: { partner },
      });
    } else {
      history.replace({
        pathname: `/partners`,
        state: { partner },
      });
    }
  };

  return (
    <LguMasterTemplate partner={partner}>
      <Content center>
        <EPaymentError
          onClose={gotoPartnerService}
          {...props}
          partner={partner}
        />
      </Content>
    </LguMasterTemplate>
  );
};

export default PaymentError;
