import React, { useState } from "react";
import {
  FormModal,
  Combobox,
  integerRangeToArray,
  getCurrentYear,
} from "rsi-react-components";

const PayOption = ({ initialData, onAccept, open, onCancel }) => {
  const [cy] = useState(getCurrentYear());
  const initialYears = integerRangeToArray(initialData.fromyear, cy + 3);
  const initialQtr = (initialYears[0] === initialData.billtoyear ? initialData.fromqtr : 1 )
  const [years] = useState(initialYears);
  const [qtrs, setQtrs] = useState(integerRangeToArray(initialQtr, 4));

  const handleAccept = (data) => {
    onAccept(data);
  };

  const updateQtrs = (billtoyear, form) => {
    if (billtoyear === initialData.fromyear) {
      setQtrs(integerRangeToArray(initialData.fromqtr, 4));
    } else {
      setQtrs([1, 2, 3, 4]);
    }
    form.change("billtoqtr", 4)
  };

  return (
    <FormModal
      initialData={initialData}
      open={open}
      caption="Pay Options"
      onAccept={handleAccept}
      onCancel={onCancel}
      maxWidth={100}
    >
      <Combobox caption="Year to Bill" name="billtoyear" items={years} listener={updateQtrs} />
      <Combobox caption="Quarter to Bill" name="billtoqtr" items={qtrs} />
    </FormModal>
  );
};

export default PayOption;
