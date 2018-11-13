import WelcomeScreen from '../screens/WelcomeScreen'
import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'

test('WelcomeScreen snapShot', () => {
    const snap = renderer.create(
        <WelcomeScreen/>
    ).toJSON()
    expect(snap).toMatchSnapshot()
})