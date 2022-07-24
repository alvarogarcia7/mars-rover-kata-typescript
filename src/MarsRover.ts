export class MarsRover {
  private static map = {
    f: (position) => position.forward(),
    b: (position) => position.backward(),
    l: (position) => position.turnLeft(),
    r: (position) => position.turnRight(),
  }
  private position: Position

  constructor(position: Position) {
    this.position = position
  }

  public move(commands: string) {
    commands.split('').map((command) => {
      try {
        MarsRover.map[command](this.position)
      } catch (e) {
        throw Error(`Invalid command '${command}'`)
      }
    })
  }
}

export class Direction {
  private static map = {
    N: {left: 'W', right: 'E', forward: (t) => t.increaseY(), backward: (t) => t.decreaseY()},
    W: {left: 'S', right: 'N', forward: (t) => t.decreaseX(), backward: (t) => t.increaseX()},
    S: {left: 'E', right: 'W', forward: (t) => t.decreaseY(), backward: (t) => t.increaseY()},
    E: {left: 'N', right: 'S', forward: (t) => t.increaseX(), backward: (t) => t.decreaseX()}
  }
  public facing: string

  constructor(facing: string) {
    this.facing = facing
  }

  public left() {
    this.facing = Direction.map[this.facing].left
  }

  public right() {
    this.facing = Direction.map[this.facing].right
  }

  public forward(x) {
    Direction.map[this.facing].forward(x)
  }

  public backward(x) {
    Direction.map[this.facing].backward(x)
  }
}

export class Position {
  public static at(x: number, y: number) {
    return {
      facing(directionRaw: string) {
        const direction = new Direction(directionRaw)
        return new Position(x, y, direction)
      }
    }
  }

  private direction: Direction
  private x: number
  private y: number

  private constructor(x: number, y: number, direction: Direction) {
    this.x = x
    this.y = y
    this.direction = direction
  }

  public turnLeft() {
    this.direction.left()
  }

  public turnRight() {
    this.direction.right()
  }

  public forward() {
    this.direction.forward(this)
  }

  public backward() {
    this.direction.backward(this)
  }

  public increaseX() {
    this.x++
  }

  public decreaseX() {
    this.x--
  }

  public increaseY() {
    this.y++
  }

  public decreaseY() {
    this.y--
  }

}
