export class MarsRover {
  private position: Position

  constructor(position: Position) {
    this.position = position
  }

  public move(commands: string) {
    commands.split('').map((command) => {
      if (command === 'f') {
        this.position.forward()
      } else if (command === 'b') {
        this.position.decreaseY()
      } else if (command === 'l') {
        this.position.turnLeft()
      } else if (command === 'r') {
        this.position.turnRight()
      } else {
        throw Error(`Invalid command '${command}'`)
      }
    })
  }
}

export class Direction {
  public facing: string
  private map = {
    N: {left: 'W', right: 'E'},
    W: {left: 'S', right: 'N'},
    S: {left: 'E', right: 'W'},
    E: {left: 'N', right: 'S'}
  }

  constructor(facing: string) {
    this.facing = facing
  }

  public left() {
    this.facing = this.map[this.facing].left
  }

  public right() {
    this.facing = this.map[this.facing].right
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

  public direction: Direction
  private x: number
  private y: number

  private constructor(x: number, y: number, direction: Direction) {
    this.x = x
    this.y = y
    this.direction = direction
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

  public turnLeft() {
    this.direction.left()
  }

  public turnRight() {
    this.direction.right()
  }

  public forward() {
    if (this.direction.facing === 'N') {
      this.increaseY()
    } else if (this.direction.facing === 'S') {
      this.decreaseY()
    } else if (this.direction.facing === 'W') {
      this.decreaseX()
    }
  }

}
