<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { DeferredInput } from '../../all';
import { SortDirection } from '../../../model/real_enums/sort/SortDirection';
import { SortLocalDisabledMods } from '../../../model/real_enums/sort/SortLocalDisabledMods';
import { SortNaming } from '../../../model/real_enums/sort/SortNaming';

@Component({
    components: {
        DeferredInput,
    }
})
export default class SearchAndSort extends Vue {
    get order() {
        return this.$store.state.profile.order;
    }

    set order(value: SortNaming) {
        this.$store.dispatch('profile/updateOrder', value);
    }

    get direction() {
        return this.$store.state.profile.direction;
    }

    set direction(value: SortDirection) {
        this.$store.dispatch('profile/updateDirection', value);
    }

    get disabledPosition() {
        return this.$store.state.profile.disabledPosition;
    }

    set disabledPosition(value: SortLocalDisabledMods) {
        this.$store.dispatch('profile/updateDisabledPosition', value);
    }

    get search() {
        return this.$store.state.profile.searchQuery;
    }

    set search(value: string) {
        this.$store.commit('profile/setSearchQuery', value);
    }

    get orderOptions() {
        return Object.values(SortNaming);
    }

    get directionOptions() {
        return Object.values(SortDirection);
    }

    get disabledOptions() {
        return Object.values(SortLocalDisabledMods);
    }

    async destroyed() {
        this.$store.commit('profile/setSearchQuery', '');
    }
}
</script>

<template>
    <div class="inherit-background-colour sticky-top sticky-top--search non-selectable">
        <div class="is-shadowless is-square">
            <div class="no-padding-left card-header-title">

                <div class="input-group input-group--flex margin-right">
                    <label for="local-search" class="non-selectable">{{ $t('views.search.search') }}</label>
                    <DeferredInput
                        v-model="search"
                        id="local-search"
                        class="input margin-right"
                        type="text"
                        :placeholder="$t('views.search.searchPH')"
                    />
                </div>

                <div class="input-group margin-right">
                    <label for="local-sort-order" class="non-selectable">{{ $t('views.search.sort') }}</label>
                    <select
                        v-model="order"
                        id="local-sort-order"
                        class="select select--content-spacing margin-right margin-right--half-width">
                        <option v-for="(option) in orderOptions" :key="`order-option-${option}`" :value="option">
                            {{ $t(`views.search.orderOptions.${option}`)}}
                        </option>
                    </select>
                    <select
                        v-model="direction"
                        id="local-sort-direction"
                        class="select select--content-spacing">
                        <option v-for="(option) in directionOptions" :key="`direction-option-${option}`" :value="option">
                            {{ $t(`views.search.directionOptions.${option}`)}}
                        </option>
                    </select>
                </div>

                <div class="input-group">
                    <label for="local-deprecated-position" class="non-selectable">{{ $t('views.search.disabled') }}</label>
                    <select
                        v-model="disabledPosition"
                        id="local-deprecated-position"
                        class="select select--content-spacing">
                        <option v-for="(option) in disabledOptions" :key="`disabled-option-${option}`" :value="option">
                            {{ $t(`views.search.disabledOptions.${option}`)}}
                        </option>
                    </select>
                </div>

            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">

</style>
