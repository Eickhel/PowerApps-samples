import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class PowerFontPCF implements ComponentFramework.StandardControl<IInputs, IOutputs> {
  private _container: HTMLDivElement;
  private _context: ComponentFramework.Context<IInputs>;
  private labelElement: HTMLLabelElement;
  private _fontName: string;
  private _fontSize: number;
  private _link: HTMLLinkElement;

  /**
   * Empty constructor.
   */
  constructor() {}

  /**
   * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
   * Data-set values are not initialized here, use updateView.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
   * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
   * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
   * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
   */
  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary,
    container: HTMLDivElement
  ) {
    this._context = context;
    this._container = document.createElement("div");
    // creating a HTML label element that shows the value that is set on the linear range control
    this.labelElement = document.createElement("label");
    this.labelElement.innerHTML = "This is a test";
    this.labelElement.setAttribute("style", "font-family: 'Ruge Boogie', cursive;");
    this._container.appendChild(this.labelElement);
    container.appendChild(this._container);

    this._link = document.createElement("link");
    this._link.id = "PowerFontUrl";
    this._link.rel = "stylesheet";
    this._link.href = `https://fonts.googleapis.com/css?family=Indie+Flower&display=swap`;

    document.getElementsByTagName("head")[0].appendChild(this._link);
  }

  /**
   * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
   */
  public updateView(context: ComponentFramework.Context<IInputs>): void {
    // Add code to update control view
    this._fontName = context.parameters.fontName.formatted ? context.parameters.fontName.formatted : "Indie Flower";
    this._fontSize = context.parameters.fontSize.raw ? context.parameters.fontSize.raw : 20;

    if (this._fontName.length > 0 && this._fontName != "val") {
      // Thanks to https://www.freecodecamp.org/news/three-ways-to-title-case-a-sentence-in-javascript-676a9175eb27/
      this._fontName = this._fontName
        .toLowerCase()
        .split(" ")
        .map(function(word) {
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join("+");
      var link = <HTMLLinkElement>document.getElementById("PowerFontUrl");
      link.href = `https://fonts.googleapis.com/css?family=${this._fontName}&display=swap`;

      this.labelElement.setAttribute(
        "style",
        `font-family: '${this._fontName.replace("+", " ")}', cursive; font-size: ${this._fontSize}px`
      );
    }
  }

  /**
   * It is called by the framework prior to a control receiving new data.
   * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
   */
  public getOutputs(): IOutputs {
    return {};
  }

  /**
   * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
   * i.e. cancelling any pending remote calls, removing listeners, etc.
   */
  public destroy(): void {
    // Add code to cleanup control if necessary
  }
}
