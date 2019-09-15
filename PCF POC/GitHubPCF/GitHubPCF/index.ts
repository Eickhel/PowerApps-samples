import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class GitHubPCF implements ComponentFramework.StandardControl<IInputs, IOutputs> {
  private _organization: string;
  private _value: number;

  // PCF framework delegate which will be assigned to this object which would be called whenever any update happens.
  private _notifyOutputChanged: () => void;
  private button: HTMLButtonElement;

  // Reference to the control container HTMLDivElement
  // This element contains all elements of our custom control example
  private _container: HTMLDivElement;
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
   * @param container If a control is marked control-type='starndard', it will receive an empty div element within which it can render its content.
   */
  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary,
    container: HTMLDivElement
  ) {
    this._organization = context.parameters.organizationName.formatted
      ? context.parameters.organizationName.formatted
      : "";

    // Creating a button element to fetch
    this.button = document.createElement("button");
    this.button.innerHTML = "Fetch GitHub";
    this.button.addEventListener("click", this.onButtonClick.bind(this));

    // Adding all the elements created to the container DIV.
    this._container = document.createElement("div");
    this._container.appendChild(this.button);
    container.appendChild(this._container);

    this._notifyOutputChanged = notifyOutputChanged;
  }

  /**
   * Button Event handler for the button created as part of this control
   * @param event
   */
  private onButtonClick(event: Event): void {
    if (this._organization == "") return;

    fetch(`https://api.github.com/orgs/${this._organization}/members`, {
      method: "GET"
    })
      .then(res => res.json())
      .then(res => {
        this._value = res.length;
        this._notifyOutputChanged();
      });
  }

  /**
   * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
   */

  public updateView(context: ComponentFramework.Context<IInputs>): void {
    // Add code to update control view
    this._organization = context.parameters.organizationName.formatted
      ? context.parameters.organizationName.formatted
      : "";
  }

  /**
   * It is called by the framework prior to a control receiving new data.
   * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
   */
  public getOutputs(): IOutputs {
    return {
      membersCount: this._value
    };
  }

  /**
   * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
   * i.e. cancelling any pending remote calls, removing listeners, etc.
   */
  public destroy(): void {
    // Add code to cleanup control if necessary
  }
}
