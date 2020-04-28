
/**
 * Class For Circuit Node ie. Point wires can connect with nodes
 */
export class Point {
  body: any; // Body of the Circuit Node

  // Hide node on creation
  defaultAttr: any = {
    fill: 'rgba(0,0,0,0)',
    stroke: 'rgba(0,0,0,0)'
  };

  // Show red color with black stroke on hover
  nodeAttr: any = {
    fill: 'rgba(255,0,0,1)',
    stroke: 'rgba(0,0,0,1)'
  };

  // Stores the reference of wire which is connected to it
  connectedTo = null;

  // Hover callback called on hover over node
  hoverCallback: any = null;

  // Hover Close Callback called if hover is removed
  hoverCloseCallback: any = null;
  /**
   * Constructor for Circuit Node
   * @param canvas Raphael Canvas / paper
   * @param x x position of node
   * @param y y position of node
   * @param label label to be shown when hover
   * @param half The Half width of Rectangle
   * @param parent parent of the circuit node
   */
  constructor(
    private canvas: any,
    public x: number,
    public y: number,
    public label: string,
    public half: number,
    public parent: any
  ) {
    // Create a rectangle of 4x4 and set default color and stroke
    this.body = this.canvas.rect(x, y, 2 * this.half, 2 * this.half);

    this.body.attr(this.defaultAttr);

    // Set Hover callback
    this.body.hover(() => {
      // Check if callback is present if it is then call it
      if (this.hoverCallback) {
        this.hoverCallback(this.x, this.y);
      }

      this.body.attr(this.nodeAttr); // Change Stroke and fill of the Node
    }, () => {
      // Check if close callback is present if present call it
      if (this.hoverCloseCallback) {
        this.hoverCloseCallback(this.x, this.y);
      }

      this.body.attr(this.defaultAttr); // Change Stroke and fill back to default
    });

    // Set Mouse over event
    this.body.mouseover((evt: MouseEvent) => {
      // TODO: Show Label bubble
    });

    // Set mouse out popup
    this.body.mouseout(() => {
      // TODO: Hide Label Bubble
    });

    // Set click listener
    this.body.click(() => {
      // TODO: Connect With Wires
    });

  }

  /**
   * Set Hover and Hover close Callback
   * @param callback Hover Callback
   * @param closeCallback Hover Close Callback
   */
  setHoverCallback(callback = null, closeCallback = null) {
    this.hoverCallback = callback;
    this.hoverCloseCallback = closeCallback;
  }

  /**
   * Return the center position of the Node
   */
  position() {
    return [this.x + this.half, this.y + this.half];
  }

  /**
   * Change the Position of Node with relative to current position
   * @param dx change in x axis
   * @param dy change in y axis
   */
  relativeMove(dx: number, dy: number) {
    this.x += dx;
    this.y += dy;
    // update the position
    this.body.attr({
      x: this.x,
      y: this.y
    });
  }

  /**
   * Hide Node
   */
  hide() {
    this.body.attr(this.defaultAttr);
  }

  /**
   * Show Node
   */
  show() {
    this.body.attr(this.nodeAttr);
  }

  /**
   * Move Node to x,y
   * @param x new x position of Node
   * @param y new y position of Node
   */
  move(x: number, y: number) {
    this.x = x;
    this.y = y;
    // Update the positon
    this.body.attr({
      x: this.x,
      y: this.y
    });
  }

  // Change the scale of the body
  scale(value: number) {
    this.body.scale(value, value);
  }

  /**
   * Remove Node from canvas
   */
  remove() {
    this.body.remove();
  }
}
