import {MarsRover, Position} from './MarsRover'

function aMarsRoverAt(x, y, directionRaw) {
  return new MarsRover(Position.at(x, y).facing(directionRaw))
}

describe('Mars Rover', () => {
  test(`cannot accept an invalid command`, () => {
    const input = {x: 0, y: 0, direction: 'N'}
    const startingPositionRover = aMarsRoverAt(input.x, input.y, input.direction)

    expect(() => {
      startingPositionRover.move('X')
    }).toThrow("Invalid command 'X'")
  })
})

describe.each([
  {input: {x: 0, y: 0, direction: 'N'}, expected: {x: 0, y: 0, direction: 'N'}},
])('Mars Rover', ({input, expected}) => {
  test(`stays at the landing position: ${input.x}, ${input.y} facing ${input.direction}`, () => {
    const startingPositionRover = aMarsRoverAt(input.x, input.y, input.direction)
    const expectedPositionRover = aMarsRoverAt(expected.x, expected.y, expected.direction)

    // no movement

    expect(startingPositionRover).toEqual(expectedPositionRover)
  })
})

describe.each([
  {input: {x: 0, y: 0, direction: 'N'}, commands: 'f', expected: {x: 0, y: 1, direction: 'N'}},
  {input: {x: 0, y: 0, direction: 'N'}, commands: 'b', expected: {x: 0, y: -1, direction: 'N'}},
])('Mars Rover', ({input, commands, expected}) => {
  test(`moves after receiving one command: ${input.x}, ${input.y} facing ${input.direction}`, () => {
    const startingPositionRover = aMarsRoverAt(input.x, input.y, input.direction)
    const expectedPositionRover = aMarsRoverAt(expected.x, expected.y, expected.direction)

    startingPositionRover.move(commands)

    expect(startingPositionRover).toEqual(expectedPositionRover)
  })
})
