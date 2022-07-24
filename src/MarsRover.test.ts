import {Direction, MarsRover, Position} from './MarsRover'

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
  {input: {x: 0, y: 0, direction: 'N'}, commands: 'l', expected: {x: 0, y: 0, direction: 'W'}},
  {input: {x: 0, y: 0, direction: 'N'}, commands: 'r', expected: {x: 0, y: 0, direction: 'E'}},
  {input: {x: 0, y: 0, direction: 'N'}, commands: 'ff', expected: {x: 0, y: 2, direction: 'N'}},
  {input: {x: 0, y: 0, direction: 'N'}, commands: 'fb', expected: {x: 0, y: 0, direction: 'N'}},
  {input: {x: 0, y: 0, direction: 'N'}, commands: 'lf', expected: {x: -1, y: 0, direction: 'W'}},
  {input: {x: 0, y: 0, direction: 'S'}, commands: 'f', expected: {x: 0, y: -1, direction: 'S'}},
])('Mars Rover', ({input, commands, expected}) => {
  test(`moves after receiving commands '${commands}': ${input.x}, ${input.y} facing ${input.direction}`, () => {
    const startingPositionRover = aMarsRoverAt(input.x, input.y, input.direction)
    const expectedPositionRover = aMarsRoverAt(expected.x, expected.y, expected.direction)

    startingPositionRover.move(commands)

    expect(startingPositionRover).toEqual(expectedPositionRover)
  })
})

describe.each([
  {input: {x: 0, y: 0, direction: 'E'}, commands: 'f', expected: {x: 1, y: 0}},
])('Mars Rover', ({input, commands, expected}) => {
  test(`advancing movements never affect direction. Move '${commands}'. ${input.x}, ${input.y} facing ${input.direction}`, () => {
    const startingPositionRover = aMarsRoverAt(input.x, input.y, input.direction)
    const expectedPositionRover = aMarsRoverAt(expected.x, expected.y, input.direction)

    startingPositionRover.move(commands)

    expect(startingPositionRover).toEqual(expectedPositionRover)
  })
})

describe.each([
  {input: 'N', expected: 'W'},
  {input: 'W', expected: 'S'},
  {input: 'S', expected: 'E'},
  {input: 'E', expected: 'N'},
])('Position', ({input, expected}) => {
  test(`turn left (${input})`, () => {
    const direction = new Direction(input)

    direction.left()

    expect(direction).toEqual(new Direction(expected))
  })
})

describe.each([
  {input: 'N', expected: 'E'},
  {input: 'W', expected: 'N'},
  {input: 'S', expected: 'W'},
  {input: 'E', expected: 'S'},
])('Position', ({input, expected}) => {
  test(`turn right (${input})`, () => {
    const direction = new Direction(input)

    direction.right()

    expect(direction).toEqual(new Direction(expected))
  })
})
