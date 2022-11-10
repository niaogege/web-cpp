import { withTranslation } from "react-i18next";
import { Component } from "react";
class LegacyWelcomeClass extends Component {
  render() {
    const { t } = this.props;
    return <h2>{t("title")}</h2>;
  }
}
const Welcome = withTranslation()(LegacyWelcomeClass);
export default Welcome;
