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
