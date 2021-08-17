import React, { useState } from "react";
import {
  Form,
  Text,
  Title,
  ActionBar,
  Subtitle,
  Spacer,
  Service,
  Error,
  BackLink,
  Integer,
  Panel,
  Card,
  Submit,
  useDataContext
} from "rsi-react-components";

const InitialInfo = ({ title, partner, moveNextStep, movePrevStep, onCancel }) => {
  const [ctx, updateCtx] = useDataContext();
  const [mode, setMode] = useState("initial");
  const [error, setError] = useState();

  const currentYear = new Date().getFullYear();

  const getBilling = async (data, billOptions = {}) => {
    const svc = await Service.lookupAsync(`${partner.id}:OnlineLandTaxBillingService`, "rpt");
    const params = { txntype: data.txntype, refno: data.refno, ...billOptions };
    if (mode === "initial-advance") {
      params.billtoyear = data.billtoyear;
    }
    return await svc.invoke("getBilling", params);
  };

  const loadBill = (data) => {
    if (mode === "initial-advance") {
      if (data.billtoyear <= currentYear) {
        setError("Advance year to pay should be greater than " + currentYear);
        return;
      }
    }

    getBilling(data)
      .then((bill) => {
        data.bill = bill.info;
        data.bill.barcode = data.bill.billno;
        updateCtx(data);
        moveNextStep();
      })
      .catch((err) => {
        if (/unpaid|full/gi.test(err)) {
          setMode("initial-advance");
        } else {
          setError(err.toString());
        }
      });
  };

  return (
    <Form initialData={ctx} onSubmit={loadBill}>
      <Card>
        <Panel style={{minWidth: 400}}>

          <Title>{title}</Title>
          <Subtitle>Initial Information</Subtitle>
          <Spacer />
          <Error msg={error} />
          <Panel visibleWhen={mode === "initial"}>
            <Text
              caption="Tax Declaration No."
              name="refno"
              autoFocus={true}
              required={true}
            />
          </Panel>

          <Panel visibleWhen={mode === "initial-advance"}>
            <p>
              The associated ledger is fully paid for the current year.
              <br />
              To pay in advance, specify the year and click Next button.
            </p>
            <Spacer />
            <Panel>
              <Text caption="Tax Declaration No." name="refno" disabled={true} />
              <Integer
                caption="Advance Year to Pay"
                name="billtoyear"
                thousandSeparator={false}
                autoFocus={true}
                required={true}
              />
            </Panel>
          </Panel>
        </Panel>
        <ActionBar>
          <BackLink caption="Back" variant="text" action={onCancel} />
          <Submit caption="Next" />
        </ActionBar>
      </Card>
    </Form>
  );
};

export default InitialInfo;
