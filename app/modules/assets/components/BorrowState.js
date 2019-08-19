import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "../../../components/basic";
import { connect } from "react-redux";
import { changeBorrowState } from "../actions";

class BorrowState extends Component {
  componentDidMount() {
    const borrower = this.props.borrow ? this.props.borrow.borrower : null;
  }

  onPress = borrowState => {
    const { code, uid, username } = this.props;
    let data = { code, uid, username, state: borrowState };

    if (this.props.borrow) {
      const { borrower, borroweruid } = this.props.borrow;
      data = { ...data, borrower, borroweruid };
    }

    this.props.changeBorrowState(data);
  };

  renderMessage = message => {
    return (
      <View style={styles.info}>
        <Text style={{ fontSize: 14, color: "grey" }}>{message}</Text>
      </View>
    );
  };

  renderIdleState = () => {
    return <Button title="BORROW" onPress={() => this.onPress("proposing")} />;
  };

  renderBorrowedState = () => {
    const { borrow, username } = this.props;
    const message = `${borrow.borrower} is borrowing this asset`;
    if (username === borrow.borrower)
      return <Button title="RETURN" onPress={() => this.onPress("returned")} />;
    else return this.renderMessage(message);
  };

  renderProposedState = () => {
    const { username, role, borrow } = this.props;
    if (role === "admin") {
      const message = `${borrow.borrower} is proposing to borrow this asset`;
      return (
        <View>
          {this.renderMessage(message)}
          <View style={{ flexDirection: "row" }}>
            <View style={{ flexGrow: 1 }}>
              <Button
                title="APPROVE"
                onPress={() => this.onPress("approved")}
              />
            </View>
            <View style={{ flexGrow: 1 }}>
              <Button
                title="REJECT"
                color="#fcd6da"
                onPress={() => this.onPress("rejected")}
              />
            </View>
          </View>
        </View>
      );
    } else {
      const message = `${borrow.borrower} is proposing to borrow this asset`;
      if (borrow.borrower === username)
        return (
          <Button title="CANCEL" onPress={() => this.onPress("cancelled")} />
        );
      else return this.renderMessage(message);
    }
  };

  renderState = () => {
    if (this.props.borrow) {
      const { borrowState } = this.props.borrow;
      if (!borrowState) return this.renderIdleState();
      else if (borrowState === "proposing") return this.renderProposedState();
      else return this.renderBorrowedState();
    } else {
      return this.renderIdleState();
    }
  };

  render() {
    return <View style={styles.container}>{this.renderState()}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40
  },
  info: {
    marginBottom: 20,
    alignItems: "center"
  }
});

const mapStateToProps = state => {
  const { uid, username, role } = state.authReducer;
  const { code, borrow } = state.assetFormReducer;
  return { uid, username, role, code, borrow };
};

export default connect(
  mapStateToProps,
  { changeBorrowState }
)(BorrowState);
