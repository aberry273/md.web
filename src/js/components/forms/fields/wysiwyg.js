
 
export default function (data) {
    return ` 
        <div x-data="{
            linkEvent: 'form:input:link',
            showElementEditor: false,
            showEditor: true,
            rawValue: '',
            processedValue: '',
            timer: null,
            init() {
                //this.rawValue = field.value || '';
                //this.processedValue = _mxForm_ProcessHtml(this.rawValue);
                //this.showEditor = true;
            },
        }">
            <span x-text="field.label"></span>
            <input
                :type="field.type"
                :name="field.name"
                :disabled="true"
                :hidden="true"
                :aria-label="field.ariaLabel || field.label"
                :value="field.value"
                x-model="field.value"
                :read-only="field.readonly"
                :role="field.role"
                :checked="field.checked"
                :placeholder="field.placeholder"
                :autocomplete="field.autocomplete"
                :aria-invalid="field.ariaInvalid == true"
                :aria-describedby="field.id || field.name+i"
                ></input>
            <div
                x-show="showEditor"
                @keyup.@="() => {
                    this.showElementEditor = true;
                }"
                @keyup="($event) => {
                    const value = $event.target.innerText;
                    field.value = value;
                }"
                @keyup.debounce="() => {
                    const hasUrl = _mxForm_ValueHasUrl($event.target.innerText)
                    if (hasUrl) {
                        const value = _mxForm_ValueGetUrl($event.target.innerText);
                        _mxEvents_Emit(linkEvent, value)
                    }
                }"
                contenteditable
                class="wysiwyg"
                x-html="rawValue">
            </div>

            <!--Mentions, etc-->
            <div
                x-show="showElementEditor"
                style="z-index: 11111;">
                <input name="elementEditor" />
            </div>

            <div
                style="z-index: 1111;"
                x-show="!showEditor"
                class="wysiwyg"
                x-html="processedValue"></div>

            <small
                x-show="field.helper != null && field.helper.length > 0"
                :id="field.id || field.name+i"  x-text="field.helper"></small>
        </div>
      
    `
}