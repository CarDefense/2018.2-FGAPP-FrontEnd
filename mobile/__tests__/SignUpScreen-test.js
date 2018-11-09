import SignUpScreen from '../screens/SignUpScreen'
import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'

test('SignUpScreen snapShot', () => {
    const snap = renderer.create(
        <SignUpScreen/>
    ).toJSON()
    expect(snap).toMatchSnapshot()
})