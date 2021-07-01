import React, { useState } from 'react'
import {
  Card,
  Panel,
  Text,
  Button,
  Submit,
  Form,
  ActionBar,
  Spacer,
  Service,
  Error,
  Subtitle,
  Title,
  Decimal,
  BackLink,
  useDataContext
} from 'rsi-react-components'

import PayOption from './PayOption'

const OnlineBilling = ({
  title,
  page,
  partner,
  moveNextStep, 
  movePrevStep,
}) => {
  const [ctx, updateCtx] = useDataContext();
  const [error, setError] = useState();
  const [showPayOption, setShowPayOption] = useState(false)

  const getBilling = async (billOptions = {}) => {
    const svc = await Service.lookupAsync(`${partner.id}:OnlineLandTaxBillingService`, "rpt")
    const params = { txntype: ctx.txntype, refno: ctx.refno, ...billOptions }
    return await svc.invoke("getBilling", params);
  }

  const loadBill = (billOptions = {}) => {
    setError(null);
    getBilling(billOptions).then(bill => {
      updateCtx({bill: bill.info});
    }).catch(err => {
      setError(err.toString());
    })
  }

  const payOptionHandler = (billOption) => {
    setShowPayOption(false)
    loadBill(billOption)
  }

  const checkoutPayment = (billdata) => {
    const bill = { ...billdata };
    const items = bill.items;
    delete bill.items;

    updateCtx({
      bill: {
        origin: ctx.origin, 
        refno: ctx.refno,
        txntype: ctx.txntype,
        orgcode: partner.id,
        billtoyear: bill.billtoyear,
        billtoqtr: bill.billtoqtr,
        paidby: bill.paidby,
        paidbyaddress: bill.paidbyaddress,
        amount: bill.amount,
        particulars: `Real Property TD No. ${bill.tdno} ${bill.billperiod}`,
        items: items,
        info: {data: bill},
      }
    });

    moveNextStep();
  }

  const visibleContactInfo = !ctx.contact.email ? false : ctx.contact.email === ctx.bill.email;

  return (
    <Card>
      <Title>{title}</Title>
      <Subtitle>{page.caption}</Subtitle>
      <Spacer />
      <Error msg={error} />
      <Form initialData={ctx.bill} onSubmit={checkoutPayment}>
        <Panel style={{width: 500}}>
          <Panel row>
            <Text name='billno' caption='Bill No.' readOnly={true} />
            <Text name='billdate' caption='Bill Date' readOnly={true} />
          </Panel>
          <Text name='tdno' caption='TD No.' readOnly={true} />
          <Text name='fullpin' caption='PIN' readOnly={true} />
          <Text name='taxpayer.name' caption='Property Owner' readOnly={true} visible={visibleContactInfo} />
          <Text name='taxpayer.address' caption='Owner Address' readOnly={true} visible={visibleContactInfo} />
          <Text name='billperiod' caption='Bill Period' readOnly={true} />
          <Decimal name='amount' caption='Amount Due' readOnly={true} textAlign="left" />
          <ActionBar>
            <BackLink caption='Back' action={movePrevStep} />
            <Panel row>
              <Button caption='Pay Option' action={() => setShowPayOption(true)} variant="outlined" />
              <Submit caption='Confirm Payment' disabled={ctx.bill.amount === 0} />
            </Panel>
          </ActionBar>
        </Panel>
      </Form>
      
      <PayOption
        initialData={{
            billtoyear: ctx.bill.billtoyear,
            billtoqtr: ctx.bill.billtoqtr,
            fromyear: ctx.bill.fromyear,
            fromqtr: ctx.bill.fromqtr,
          }}
        open={showPayOption}
        onAccept={payOptionHandler}
        onCancel={() => setShowPayOption(false)}
      />
    </Card>
  )
}

export default OnlineBilling
