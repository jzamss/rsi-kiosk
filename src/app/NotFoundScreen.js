import React from "react";
import {
  Page,
  Label,
  Spacer,
  Panel,
  Button,
  Content,
} from "rsi-react-components";

// import FilipizenIcon from "../icons/FilipizenIcon";
import FilipizenMasterTemplate from "../templates/FilipizenTemplate";

const NotFoundScreen = ({history}) => {

  const gotoHome = () => {
    history.push("/");
  };

  return (
    <FilipizenMasterTemplate showHeader={false}>
      <Page>
        <Spacer height={60} />
        {/* <FilipizenIcon width={200} /> */}
        <Spacer height={30} />
        <Content center>
          <Label labelStyle={styles.code}>404</Label>
          <label style={styles.label}>
            Sorry, the page you tried to access cannot be found.
          </label>
          <Spacer height={40} />
          <Panel style={styles.actions}>
            <Button
              style={{ paddingLeft: 50, paddingRight: 50 }}
              caption="Start Here"
              size="large"
              action={gotoHome}
            />
          </Panel>
        </Content>
      </Page>
    </FilipizenMasterTemplate>
  );
};

const styles = {
  actions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  code: {
    fontSize: 120,
    color: "#686868",
  },
  label: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#3f51b5",
    textAlign: "center",
  },
};

export default NotFoundScreen;
