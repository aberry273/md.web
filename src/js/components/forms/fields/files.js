export default function (data) {
    return ` 
            <span x-text="field.label"></span>
            <input
                :type="field.type"
                :name="field.name"
                :disabled="field.disabled == true"
                :aria-label="field.ariaLabel || field.label"
                :value="field.value"
                x-model="field.value"
                :read-only="field.readonly"
                :role="field.role"
                :checked="field.checked"
                x-on:change="field.value = Object.values($event.target.files)"
                :placeholder="field.placeholder"
                :autocomplete="field.autocomplete"
                :aria-invalid="field.ariaInvalid == true"
                :aria-describedby="field.id || field.name+i"
                ></input>
            <small 
                x-show="field.helper != null && field.helper.length > 0"
                :id="field.id || field.name+i" x-text="field.helper"></small>
       
        `
}