import { mxResponsive } from '/src/js/mixins/index.js';

export default function (data) {
    return {
        // PROPERTIES

        ...mxResponsive(data),
        tabs: ['all', 'agrees', 'disagrees'],
        selectedTab: '',
        selectedId: {},
        filters: [],
        sorting: [],
        state: {
            filters: {},
            sort: 'Created',
            sortBy: 'Desc',
        },
        header: null,
        event: 'filter:posts',
        filterEvent: 'on:filter:posts',
        open: false,
        init() {
            //Events
            this.event = data.event || 'filter:posts';
            const navFilters = data.filters || {};
            this.filters = navFilters.filters || [];
            this.sort = navFilters.sort || {};
            this.sortBy = navFilters.sortBy || {};
            this.header = data.header;
            // On updates from filter
            this.$events.on(this.filterEvent, async (filterUpdates) => {
                this.updateFiltersByEvent(filterUpdates)
            })
            this.setHtml(data);
        },
        updateFiltersByEvent(filterUpdates) {
            for (var i = 0; i < filterUpdates.length; i++) {
                const update = filterUpdates[i]
                const filterKey = update.name;
                const existingValues = (this.state.filters[filterKey] != null) ? this.state.filters[filterKey] : [];
                const updatedFilters = existingValues.concat(update.values);
                const uniqueFilters = [... new Set(updatedFilters)];
                this.state.filters[filterKey] = uniqueFilters;
            }
            this.emitChange()
        },
        isSelectedMany(val, filterName) {
            if (this.state.filters == null || this.state.filters[filterName] == null) return false;
            return this.state.filters[filterName].indexOf(val) > -1;
        },
        isSelected(val, filterName) {
            return (this.state.filters[filterName] == val);
        },
        selectMany(val, filterName) {
            if (this.state.filters[filterName] == null) this.state.filters[filterName] = [];

            const index = this.state.filters[filterName].indexOf(val);
            if (index == -1) {
                this.state.filters[filterName].push(val);
            }
            else {
                this.state.filters[filterName].splice(index, 1);
            }
            this.emitChange()
        },
        select(val, filter) {
            filter.open = false;
            if (this.state.filters[filter.name] != val) {
                this.state.filters[filter.name] = val;
            }
            else {
                delete this.state.filters[filter.name];
                //this.state.filters[filter.name] = null;
            }
            this.emitChange()
        },
        selectSort(val) {
            this.state.sort = val;
            this.emitChange()
        },
        selectSortBy(val) {
            this.state.sortBy = val;
            this.emitChange()
        },
        emitChange() {
            this.$events.emit(this.event, this.state)
        },
        stateValues() {
            const keys = Object.keys(this.state.filters);
            return keys.map(x => {
                return {
                    name: x,
                    values: this.state.filters[x]
                }
            });
        },
        filterValueName(val) {
            return `${val.name} (${val.count})`
        },
        setHtml(data) {
            // make ajax request
            const html = `
          <!--Feed-->
          <nav x-show="header && !mxResponsive_IsDesktop">
            <li>
                <strong x-text="header"></strong>
            </li>
          </nav>
          <nav>
            <!--Filters-->
            <ul style="margin-left: 0px; text-align:left;">
                <li x-show="header && mxResponsive_IsDesktop">
                    <strong x-text="header"></strong>
                </li>
                <template x-for="filter in filters">
                    <li class="px-0" x-show="filter.type == 'Checkbox'">
                        <!--Checkbox-->
                        <details class="dropdown flat">
                            <summary class="" x-text="filter.name"></summary>
                            <ul>
                                <template x-for="val in filter.values">
                                    <li>
                                        <label>
                                            <input
                                                type="checkbox"
                                                :checked="isSelectedMany(val.key, filter.name)"
                                                :name="val.key"
                                                @click="selectMany(val.key, filter.name)">
                                            </input>
                                            <span x-text="filterValueName(val)"></span>
                                        </label>
                                    </li>
                                </template>
                            </ul> 
                        </details>
                    </li>
                    <li class="px-0" x-show="filter.type == 'Radio'">
                        <!--Radio-->
                        <details class="dropdown flat" >
                          <summary class=" " x-text="filter.name"></summary>
                          <ul dir="ltr"> 
                            <template x-for="val in filter.values">
                              <li>
                                <label>
                                  <input type="radio" :checked="isSelected(val.key, filter.name)" :name="filter.name"
                                    @click="select(val.key, filter)" ></input>
                                  <span x-text="filterValueName(val)"></span>
                                </label>
                              </li>
                            </template>
                          </ul>
                        </details>
                    </li>
                    <li class="px-0" x-show="filter.type == 'Input' || filter.type == 'Select'">
                        <!--Select-->
                        <details class="dropdown flat" >
                            <summary class="outline ">
                                <span x-show="!state.filters[filter.name]" x-text="filter.name"></span>
                                <span x-show="state.filters[filter.name]" >
                                    <sup style="position: absolute; top: 0.5em;" x-text="filter.name"></sup>
                                    <sub style="padding-top: 12px;" x-text="state.filters[filter.name]"></sub>
                                </span>
                            </summary>
                            <!--No type--> 
                            <ul>
                                <template x-for="val in filter.values">
                                    <li >
                                        <a href="javascript:;" :class="isSelected(val.key, filter.name) ? 'selected' : ''"
                                            @click="select(val.key, filter)" x-text="filterValueName(val)"></a>
                                    </li>
                                </template>
                            </ul>
                        </details>
                    </li>
                </template>
            </ul>

            <!-- Sorting -->
            <ul style="margin-left: 0px; text-align:left;">
                <li class="px-0">
                     <details class="dropdown flat" >
                        <summary class="outline">
                            <span x-show="!state.sort" x-text="sort.name"></span>
                            <span x-show="state.sort">
                                <sup style="position: absolute; top: 0.5em;" x-text="sort.name"></sup>
                                <sub style="padding-top: 12px;" x-text="state.sort"></sub>
                            </span>
                        </summary>
                        <!--No type-->
                        <ul>
                            <template x-for="val in sort.values">
                                <li >
                                    <a href="javascript:;" :class="state.sort == val.key ? 'selected' : ''"
                                        @click="selectSort(val.key, sort)" x-text="val.name"></a>
                                </li>
                            </template>
                        </ul>
                    </details>
                </li>
                <li class="px-0">
                     <details class="dropdown flat" ">
                        <summary class="outline">
                            <span x-show="!state.sortBy" x-text="sortBy.name"></span>
                            <span x-show="state.sortBy" >
                                <sup style="position: absolute; top: 0.5em;" x-text="sortBy.name"></sup>
                                <sub style="padding-top: 12px;" x-text="state.sortBy"></sub>
                            </span>
                        </summary>
                        <!--No type-->
                        <ul>
                            <template x-for="val in sortBy.values">
                                <li >
                                    <a href="javascript:;" :class="state.sortBy == val.key ? 'selected' : ''"
                                        @click="selectSortBy(val.key, sortBy)" x-text="val.name"></a>
                                </li>
                            </template>
                        </ul>
                    </details>
                </li>
            </ul>
          </nav>
          <!--Selected filters-->
           <template x-if="stateValues.length > 0">
               <div class="container" >
                    <div class="grid">
                        <template x-for="filter in stateValues">
                            <div x-show="filter.values.length > 0">
                                <sup x-text="filter.name"></sup>
                                <div class="chips">
                                    <template x-for="(item, i) in filter.values">
                                        <a style="text-decoration:none" class="tag flat closable primary small"
                                        @click="selectMany(item, filter.name)">
                                            <strong><sup x-text="item"</sup></strong>
                                        </a>
                                    </template>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
            </template>
         
      `
            this.$nextTick(() => {
                this.$root.innerHTML = html
            })
        },
    }
}