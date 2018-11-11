import RegisterCar from '../screens/tab_navigator/car_defense/screens/TabNavigator/RegisterCar/RegisterCar'
import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'

test('RegisterCar snapShot', () => {
    const snap = renderer.create(
        <RegisterCar/>
    ).toJSON()
    expect(snap).toMatchSnapshot()
})
