import { assert, property, string } from 'fast-check'
import { MarsRover } from './MarsRover'

describe('Hiker', () => {
  it('answers 42 for any question', () => {
    assert(property(string(), (question) => {
      // Arrange
      const hiker = new MarsRover()

      // Act
      const answer = hiker.askQuestion(question)

      // Assert
      expect(answer).toBe(42)
    }))
  })
})

describe.each([
  {a: 1, b: 1, expected: 2},
  {a: 1, b: 2, expected: 3},
  {a: 2, b: 1, expected: 3},
])('.add($a, $b)', ({a, b, expected}) => {
  test(`returns ${expected}`, () => {
    expect(a + b).toBe(expected)
  })

  test(`returned value not be greater than ${expected}`, () => {
    expect(a + b).not.toBeGreaterThan(expected)
  })

  test(`returned value not be less than ${expected}`, () => {
    expect(a + b).not.toBeLessThan(expected)
  })
})
