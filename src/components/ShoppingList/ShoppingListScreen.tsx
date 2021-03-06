import React from 'react'
import { NavigationScreenProp } from 'react-navigation'
import { Container, Header, Icon, Body, Title, Right, Text } from 'native-base'
import {
  MenuProvider,
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption
} from 'react-native-popup-menu'
import { connect } from 'react-redux'
import ShoppingList from './ShoppingList'
import { GroceryItem } from '../../interfaces/ShoppingList/types'
import {
  deleteAllItems,
  deleteAllInCart,
  selectAllItems,
  unselectAllItems
} from '../../actions/shoppingListActions'

export interface Props extends DispatchFromProps {
  navigation: NavigationScreenProp<any, any>
}

class ShoppingListScreen extends React.Component<Props> {
  static navigationOptions = {
    header: null
  }

  constructor(props: Props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  private navigateToItemHighlight(item: GroceryItem): void {
    this.props.navigation.navigate('ItemHighlight', { item: item })
  }

  render() {
    return (
      <MenuProvider>
        <Container>
          <Header>
            <Body>
              <Title style={{ marginLeft: 0 }}>My Shopping List</Title>
            </Body>
            <Right>
              <Menu name='shoppingListMoreMenu'>
                <MenuTrigger>
                  <Icon
                    name='more'
                    style={{
                      color: '#FFFFFF',
                      padding: 10
                    }}
                  />
                </MenuTrigger>
                <MenuOptions>
                  <MenuOption onSelect={() => this.props.selectAll()}>
                    <Text
                      style={{
                        fontSize: 18,
                        padding: 10,
                        marginTop: 5,
                        marginBottom: 5
                      }}>
                      Select All
                    </Text>
                  </MenuOption>
                  <MenuOption onSelect={() => this.props.unselectAll()}>
                    <Text
                      style={{
                        fontSize: 18,
                        padding: 10,
                        marginTop: 5,
                        marginBottom: 5
                      }}>
                      Unselect All
                    </Text>
                  </MenuOption>
                  <MenuOption onSelect={() => this.props.deleteAll()}>
                    <Text
                      style={{
                        fontSize: 18,
                        padding: 10,
                        marginTop: 5,
                        marginBottom: 5
                      }}>
                      Delete All
                    </Text>
                  </MenuOption>
                  <MenuOption onSelect={() => this.props.deleteAllInCart()}>
                    <Text
                      style={{
                        fontSize: 18,
                        padding: 10,
                        marginTop: 5,
                        marginBottom: 5
                      }}>
                      Delete All In Cart
                    </Text>
                  </MenuOption>
                </MenuOptions>
              </Menu>
            </Right>
          </Header>
          <ShoppingList onItemClick={this.navigateToItemHighlight.bind(this)} />
        </Container>
      </MenuProvider>
    )
  }
}

interface DispatchFromProps {
  deleteAll: () => void
  deleteAllInCart: () => void
  selectAll: () => void
  unselectAll: () => void
}

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchFromProps => {
  return {
    deleteAll: () => dispatch(deleteAllItems()),
    deleteAllInCart: () => dispatch(deleteAllInCart()),
    selectAll: () => dispatch(selectAllItems()),
    unselectAll: () => dispatch(unselectAllItems())
  }
}

export default connect(
  null,
  mapDispatchToProps
)(ShoppingListScreen)
