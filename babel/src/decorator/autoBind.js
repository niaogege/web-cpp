class Toggle {
  @autobind
  handleClick() {
    console.log(this);
  }
  render() {}
}
const test1 = new Toggle();
test1.handleClick();
