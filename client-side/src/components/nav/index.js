import React, { Component } from 'react'
import { Menu, Container } from 'semantic-ui-react'
import './index.css'

export default class Nav extends Component {
    
    render() {
        return (
            <div>
                <Menu style={{ background: '#31364A' }} fixed='top' inverted secondary stackable>
                    <Container>

                        <Menu.Item style={{ height: 65 }}
                            name='navbar'
                            as='div'
                        >
                            Mastt Dashboard
                            </Menu.Item>
                        

                    </Container>
                </Menu>
            </div>

        )
    }
}
