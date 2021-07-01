import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Form,
  Title,
  Link,
  List,
  Spacer,
  LinearProgress,
  groupBy,
  Service,
  getNotification,
  Subtitle,
} from "rsi-react-components";
import FilipizenTemplate from "../templates/FilipizenTemplate";
import "./PartnerListScreen.css";

const svc = Service.lookup("CloudPartnerService", "partner");
const notification = getNotification();

const PartnerListScreen = (props) => {
  const [loading, setLoading] = useState(true);
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    svc.invoke("getActivePartners", null, (err, partners) => {
      if (!err) {
        setPartners(partners);
      }
      setLoading(false);
    });
  }, []);

  const updatePartnerStatus = (channel, status) => {
    const idx = partners.findIndex((partner) => partner.id === channel);
    if (idx >= 0) {
      const partner = partners[idx];
      if (partner.isonline !== status) {
        partner.isonline = status;
        const updatedPartners = [...partners];
        updatedPartners[idx] = partner;
        setPartners(updatedPartners);
      }
    }
  };

  notification.register("activate", (channel) => {
    updatePartnerStatus(channel, "1");
  });

  notification.register("deactivate", function (channel) {
    updatePartnerStatus(channel, "0");
  });

  const cluster = groupBy(partners, "clusterid");
  const keys = Object.keys(cluster);

  return (
    <FilipizenTemplate loading={loading}>
      <div className="PartnerListScreen">
        <Spacer height={20} />
        <Title>Select a Partner Agency</Title>
        <div className="PartnerListScreen__lgus">
          {keys.map((key) => (
            <PartnerLgu key={key} partners={cluster[key]} />
          ))}
        </div>
      </div>
    </FilipizenTemplate>
  );
};

const PartnerLgu = ({ partners }) => {
  const partnerGroup = partners[0].group;
  return (
    <div className="PartnerLgu">
      <Subtitle>{partnerGroup.title}</Subtitle>
      {partners.map((partner) => (
        <div key={partner.id}>
          <Link
            style={partner.isonline !== "0" ? {} : { color: "#aaa" }}
            component={RouterLink}
            to={{
              pathname: `/partner/${partnerGroup.objid}_${partner.name}/services`,
              state: { partner },
            }}
            caption={`${partner.title} (${partner.id})`}
          />
        </div>
      ))}
    </div>
  );
};

export default PartnerListScreen;
