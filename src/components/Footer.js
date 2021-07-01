import React from "react";
import "./Footer.css";
import FilipizenIcon from "../icons/FilipizenIcon";

const communityLinks = [
  { title: "Facebook", href: "www.facebook.com" },
  { title: "Youtube", href: "www.youtube.com" },
];

const companyLinks = [
  { title: "About", href: "" },
  { title: "News & Reviews", href: "" },
  { title: "Contact", href: "" },
];

const partnerLinks = [
  { title: "Land Bank", href: "" },
  { title: "DBP", href: "" },
  { title: "Paymaya", href: "" },
];

const supportLinks = [
  { title: "Contact", href: "" },
  { title: "Private Policy", href: "" },
  { title: "Terms of Service", href: "" },
];

const Footer = (props) => {
  return (
    <footer className="Footer">
      <hr className="Footer__divider" />
      <div className="Footer__copyright">
        <div className="Footer__container">
          <div>
            <FilipizenIcon />
          </div>
          <p className="copyright">Copyright © 2020 filipizen</p>
        </div>
      </div>
      <div className="Footer__information">
        <div className="Footer__grid">
          <Footer.Item title="Community" links={communityLinks} />
          <Footer.Item title="Company" links={companyLinks} />
          <Footer.Item title="Partners" links={partnerLinks} />
          <Footer.Item title="Support" links={supportLinks} />
        </div>
      </div>
    </footer>
  );
};

Footer.Item = ({ title, links }) => {
  return (
    <div className="Footer__item">
      <h2 className="Footer__header">{title}</h2>
      <ul>
        {links.map((link) => (
          <li key={link.title}>
            <a href={link.href}>{link.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Footer;
