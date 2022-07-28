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
    N: {left: 'W', right: 'E', forward: {x: 0, y: 1}, backward: {x: 0, y: -1}},
    W: {left: 'S', right: 'N', forward: {x: -1, y: 0}, backward: {x: 1, y: 0}},
    S: {left: 'E', right: 'W', forward: {x: 0, y: -1}, backward: {x: 0, y: 1}},
    E: {left: 'N', right: 'S', forward: {x: 1, y: 0}, backward: {x: -1, y: 0}}
  }
  public facing: string

  constructor(facing: string) {
    this.facing = facing
  }

  public left() {
    return new Direction(Direction.map[this.facing].left)
  }

  public right() {
    return new Direction(Direction.map[this.facing].right)
  }

  public forward() {
    return Direction.map[this.facing].forward
  }

  public backward() {
    return Direction.map[this.facing].backward
  }
}

export class Point {
  public x: number
  public y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
}

export class Position {
  public static at(x: number, y: number) {
    return {
      withinWorld(world: World) {
        return {
          facing(directionRaw: string) {
            const direction = new Direction(directionRaw)
            return new Position(x, y, direction, world)
          }
        }
      }
    }
  }

  private direction: Direction
  private x: number
  private y: number
  private world: World

  private constructor(x: number, y: number, direction: Direction, world: World) {
    this.x = x
    this.y = y
    this.direction = direction
    this.world = world
  }

  public turnLeft() {
    this.direction = this.direction.left()
  }

  public turnRight() {
    this.direction = this.direction.right()
  }

  public forward() {
    this.sumVector(this.direction.forward())
  }

  public backward() {
    this.sumVector(this.direction.backward())
  }

  private sumVector(vector) {
    const oldPoint = new Point(this.x, this.y)
    const newPoint = new Point(this.x + vector.x, this.y + vector.y)
    const point = this.world.simplify(oldPoint, newPoint)
    this.x = point.x
    this.y = point.y
  }

}

export abstract class World {
  public static unlimited(): World {
    return new UnlimitedWorld()
  }

  public static wrapping(width: number, height: number) {
    return new WrappingWorld(width, height)
  }

  public abstract simplify(old: Point, newValue: Point): Point
}

export abstract class ObstaclesInWorld {
  public static none(world: World): World {
    return world
  }

  public static with(world: World, obstacles: Point[]): World {
    return new WorldWithObstacles(world, obstacles)
  }
}

class WorldWithObstacles implements World {
  private obstacles: Point[]
  private world: World

  constructor(world: World, obstacles: Point[]) {
    this.world = world
    this.obstacles = obstacles
  }

  public simplify(old: Point, newValue: Point): Point {
    const obstacleFound = this.obstacles.some((e: Point) => e.x === newValue.x && e.y === newValue.y)
    if (obstacleFound) {
      return old
    }
    return this.world.simplify(old, newValue)
  }
}

class WrappingWorld implements World {
  private height: number
  private width: number

  constructor(width: number, height: number) {
    this.height = height
    this.width = width
  }

  public simplify(old: Point, point: Point): Point {
    const x = point.x
    const y = point.y
    return new Point((x + this.width) % this.width, (y + this.height) % this.height)
  }
}

class UnlimitedWorld implements World {
  public simplify(old: Point, value: Point): Point {
    return value
  }
}
