import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { PartnerContext, usePartnerFromLocation } from "rsi-react-filipizen";
import LguMasterTemplate from "../templates/LguMasterTemplate";
import { getService, getServiceComponent } from "../modules";

const PartnerServiceScreen = (props) => {
  const location = useLocation();
  const history = useHistory();
  const [partner, setPartner, isPartnerError] = usePartnerFromLocation(location);
  const [service, setService] = useState();

  useEffect(() => {
    if (!partner) return;
    const service = getService({ partner, location });
    if (service) {
      setService(service);
    } else {
      history.push("/partners");
    }
  }, [partner]);

  useEffect(() => {
    if (isPartnerError) {
      history.push("/partners");
    }
  }, [isPartnerError, history]);

  if (!partner || !service) return null;

  const ServiceComponent = getServiceComponent(service);
  return (
    <PartnerContext.Provider value={[partner, setPartner]}>
      <LguMasterTemplate partner={partner}>
        <ServiceComponent {...props} />
      </LguMasterTemplate>
    </PartnerContext.Provider>
  );
};

export default PartnerServiceScreen;
