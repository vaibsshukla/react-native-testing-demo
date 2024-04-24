import { createNavigatorFactory, useNavigation } from "@react-navigation/native";
import jestConfig from "../jest.config"
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigationMock } from "../src/test/test-utils";
import {
    cleanup,
    fireEvent,
    render,
    screen,
    waitFor,
  } from '@testing-library/react-native';
import LoginSubmission from "../src/components/LoginSubmission";
import AsyncStorage from "@react-native-community/async-storage";
jest.mock('@react-native-community/async-storage',()=>({
    setItem:jest.fn()
}));

jest.mock('@react-navigation/native',()=>{
    return {
        createNavigatorFactory : jest.fn(),
        useNavigation:jest.fn()
    }
})

jest.mock('@react-navigation/stack',()=>{
    return {
        createStackNavigator : jest.fn()
    }
})

afterEach(cleanup)
beforeEach(()=>{
    useNavigationMock.mockReset()
})

jest.useFakeTimers()


it('verifies happy flow of login', async () => {
      

  const mockNavigate = jest.fn()
  useNavigationMock.mockImplementation(()=>({navigate:mockNavigate}));


  const fetchMock = global.fetch as jest.MockedFunction<typeof global.fetch>;
  fetchMock.mockResolvedValueOnce({
    json: jest.fn().mockResolvedValue({token: 'fake-token'}),
  });
  const username = "chucknorris"
  const password  = "i need no password"

  render(<LoginSubmission/>)

  fireEvent.changeText(screen.getByPlaceholderText(/username/i),username);
  fireEvent.changeText(screen.getByPlaceholderText(/password/i),password);
  fireEvent.press(screen.getByText(/submit/i))

  expect(screen.getByLabelText(/submission-in-process/i)).toBeVisible();

  expect(fetchMock).toHaveBeenCalledWith(
    'https://e2c168f9-97f3-42e1-8b31-57f4ab52a3bc.mock.pstmn.io/api/login',
    {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: {'content-type': 'application/json'},
    },
  )

  expect(fetchMock.mock.calls).toMatchInlineSnapshot(`
    [
      [
        "https://e2c168f9-97f3-42e1-8b31-57f4ab52a3bc.mock.pstmn.io/api/login",
        {
          "body": "{"username":"chucknorris","password":"i need no password"}",
          "headers": {
            "content-type": "application/json",
          },
          "method": "POST",
        },
      ],
    ]
  `)
    
  jest.advanceTimersByTime(2500)

  await waitFor(()=>expect(mockNavigate).toHaveBeenCalledTimes(1),
  {timeout:2500
  });
  expect(mockNavigate).toHaveBeenCalledWith('Home')

  expect(AsyncStorage.setItem).toHaveBeenCalledWith('token','fake-token')


});
  