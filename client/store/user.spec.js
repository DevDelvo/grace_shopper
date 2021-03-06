/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import reducer, {me, logout, getUser, removeUser} from './user'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('userReducer', () => {
  it('starts with an initital state of an empty user', () => {
    const newState = reducer(undefined, '@@INIT') // '@@INIT': the first action that is ever dispatched to any redux store is @@INIT
    expect(newState).to.deep.equal({})
  })

  it('sets the state to be a user on the state when a GET_USER action is dispatched', () => {
   const user = { email: 'g@g.com' } 
    const newState = reducer({}, getUser(user))
    expect(newState).to.deep.equal(user)
  })

  it('removes a user on the state when a removeUser action is dispatched', () => {
    const user = { email: 'g@g.com' } 
     const newState = reducer({}, removeUser(user))
     expect(newState).to.deep.equal({})
   })
})

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {user: {}}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('me', () => {
    it('eventually dispatches the GET USER action', () => {
      const fakeUser = {email: 'Cody'}
      mockAxios.onGet('/auth/me').replyOnce(200, fakeUser)
      return store.dispatch(me())
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal('GET_USER')
          expect(actions[0].user).to.be.deep.equal(fakeUser)
        })
    })
  })

  describe('logout', () => {
    it('logout: eventually dispatches the REMOVE_USER action', () => {
      mockAxios.onPost('/auth/logout').replyOnce(204)
      return store.dispatch(logout())
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal('REMOVE_USER')
          expect(history.location.pathname).to.be.equal('/login')
        })
    })
  })
})
