import React from "react"
import { Container, Header, Body, Title } from "native-base"
import { Font, AppLoading } from "expo"

import ShoppingList from "./ShoppingList"

export interface Props {}

interface State {
  loading: boolean
}

export default class ShoppingListScreen extends React.Component<Props, State> {
  static navigationOptions = {
    header: null
  }

  constructor(props: Props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  async componentWillMount() {
    // This needs to be at the highest level of the app
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    })
    this.setState({ loading: false })
  }

  render() {
    if (this.state.loading) {
      return (
        <Container>
          <AppLoading />
        </Container>
      )
    }

    return (
      <Container>
        <Header>
          <Body>
            <Title>Shopping List</Title>
          </Body>
        </Header>
        <ShoppingList />
      </Container>
    )
  }
}
