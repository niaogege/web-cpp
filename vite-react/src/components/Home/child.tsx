import { Component } from 'react';

interface Props {
  num: number;
}
class Child extends Component<Props> {
  shouldComponentUpdate(newProps: Props, oldProps: Props) {
    if (newProps.num !== oldProps.num) {
      return true;
    }
    return false;
  }
  render() {
    console.log('child render');
    return <div>This is child</div>;
  }
}

export default Child;
