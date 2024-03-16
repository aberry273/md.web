export default function (data) {
	return {
    // PROPERTIES
    loading: false,
    fields: [
      {
        name: 'Username',
        type: 'input',
        placeholder: 'Username',
        label: 'Username',
        autocomplete: null
      },
      {
        name: 'Password',
        type: 'password',
        placeholder: 'Password',
        label: 'Password',
        autocomplete: null
      }
    ],
    // INIT
    init() {
      this.setHtml(data)
    },
    // METHODS
    submitForm() {
    },
    filterPosts(feed) {
      this.loading = true;
      this.filtered = this.$store.feeds.items.filter(x => x.feed == feed);
      this.loading = false;
    },
    setHtml(data) {
      // make ajax request
      this.$root.innerHTML = `
      <form>
        <fieldset>
          <template x-for="(field, i) in fields"> 
            <label>
             <span x-text="field.label"></span>
              <input
                :type="field.type"
                :name="field.name"
                :disabled="field.disabled"
                :aria-label="field.ariaLabel || field.label"
                :value="field.value"
                x-model="field.value"
                :read-only="field.readonly"
                :role="field.role"
                :checked="field.checked"
                :placeholder="field.placeholder"
                :autocomplete="field.autocomplete"
              />
              <template x-if="field.helper != null">
                <small :id="field.id || i" x-text="field.helper"></small>
              </template>
            </label>
          </template>
        </fieldset>
        <input type="submit" value="Submit"
        />
      </form>
      `
    },
  }
}