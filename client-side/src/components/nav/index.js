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
                            name='news'
                            // 如果不使用as='div'那么就会将这个渲染成a标签，而下面link也是个a标签，就会报错
                            // 把它当做div渲染就会解决
                            as='div'
                        >
                            News
                            </Menu.Item>
                        <Menu.Item style={{ height: 65 }}
                            name='weather'
                            // 如果不使用as='div'那么就会将这个渲染成a标签，而下面link也是个a标签，就会报错
                            // 把它当做div渲染就会解决
                            as='div'
                        >
                            Weather
                            </Menu.Item>
                        <Menu.Item style={{ height: 65 }}
                            name='holidays'
                            // 如果不使用as='div'那么就会将这个渲染成a标签，而下面link也是个a标签，就会报错
                            // 把它当做div渲染就会解决
                            as='div'
                        >
                            Holidays
                            </Menu.Item>

                    </Container>
                </Menu>
            </div>

        )
    }
}
