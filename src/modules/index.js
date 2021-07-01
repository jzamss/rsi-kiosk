import loadable from "@loadable/component";

import rptis from "./rptis/module.json";
import bpls from "./bpls/module.json";

/*======================================
* REGISTERED MODULES
=======================================*/
const modules = [bpls, rptis];

/* Return the filtered modules for the given partner */
export const getModules = (partner) => {
  const pattern = partner.includeservices;
  if (!pattern) return [];

  const regex = new RegExp(`(${pattern})`, "i");
  const excludeRegex = partner.excludeservices
    ? new RegExp(`(${partner.excludeservices})`, "i")
    : null;

  const partnerModules = [...modules];
  partnerModules.forEach((module) => {
    const partnerServices = module.services.filter(
      (service) =>
        regex.test(service.name) &&
        (!excludeRegex || !excludeRegex.test(service.name))
    );
    module.services = partnerServices;
  });

  return partnerModules.filter((module) => module.services.length > 0);
};

/*
 * Return the service specified in the state
 * or extracted from the location,
 * Otherwise returns false
 */
export const getService = ({ partner, location }) => {
  if (location && location.state && location.state.service) {
    return location.state.service;
  }

  //extract service from location
  const pathname = location.pathname;
  const matches = pathname.match("/partner/(.*)/(.*)/(.*)");
  if (!matches || matches.length < 4) {
    return false;
  }
  const moduleName = matches[2];
  const serviceName = matches[3];

  const module = getModules(partner).find((mod) => mod.name === moduleName);
  if (!module) return false;
  const service = module.services.find(
    (service) => service.name === serviceName
  );
  if (!service) return false;
  return service;
};

export const getServiceComponent = (service) => {
  const ServiceComponent = loadable(() =>
    import(`./${service.module}/${service.name}/${service.component}`)
  );
  return ServiceComponent;
};

export default modules;
