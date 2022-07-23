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
  {input: {x: 0, y: 0, direction: 'N'}, expected: {x: 0, y: 0, direction: 'N'}}
])('Mars Rover', ({input, expected}) => {
  test(`stays at the landing position: ${input.x}, ${input.y} facing ${input.direction}`, () => {
    const startingPositionRover = new MarsRover(Position.at(input.x, input.y).facing(input.direction))

    // no movement

    const expectedPositionRover = new MarsRover(Position.at(expected.x, expected.y).facing(expected.direction))
  })
})
