export default function (data) {
    return ` 
        <div x-data="{
            showEditor: true,
            rawValue: '',
            processedValue: '',
            timer: null,
            init() {
                this.rawValue = field.value || '';
                this.processedValue = _mxForm_ProcessBasicHtml(this.rawValue);
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
                @click.outside="() => {
                    _mxForm_OnFieldChange(field, processedValue);
                }"
                @keyup="($event) => {
                    clearTimeout(timer)
                    //if (!parsed) return;
                    const parsed = _mxForm_ProcessBasicHtml($event.target.innerText);
                    processedValue = parsed;
                    timer = setTimeout(function() {
                        if(processedValue) _mxForm_OnFieldChange(field, processedValue);
                    }, 750);
                }"
                contenteditable
                class="wysiwyg"
                x-html="rawValue">
            </div>

            <div
                @click="showEditor = !showEditor"
                x-show="!showEditor"
                class="wysiwyg"
                x-html="processedValue"></div>

            <small
                x-show="field.helper != null && field.helper.length > 0"
                :id="field.id || field.name+i"  x-text="field.helper"></small>
        </div>
      
    `
}