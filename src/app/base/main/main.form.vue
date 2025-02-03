<template>
    <h1 class="mb-10">Display Component</h1>

    <awDatePicker :fieldElement="dateElement" @update:field="updateCallBackFieldElementDatePicker" />
    <div class="mb-2"></div>
    <awInputNumber :fieldElement="numberElement" @update:field="updateCallBackFieldElementInputNumber" />
    <div class="mb-2"></div>
    <awInputText :fieldElement="TextElement" />
    <div class="mb-2"></div>
    <awMultiSelect :fieldElement="MultiSelectElement" />
    <div class="mb-2"></div>
    <awInputPassword :fieldElement="PasswordElement" />
    <div class="mb-2"></div>
    <awTextArea :fieldElement="TextAreaElement" />
    <div class="mb-2"></div>
    <awSingleSelect :fieldElement="SingleSelectElement" />
    <div class="mb-2"></div>
    <div>
        <awDataTable :fieldElement="DataTableElement" :pageFilter="pageFilter" @update:pagefilter="updatePageFilter">
        </awDataTable>
    </div>
    <div class="mb-2"></div>

    <awButton :fieldElement="ButtonElement" @click="load" />
    <div class="mb-2"></div>
    <Button type="button" class="mt-2" severity="primary" label="Search" icon="pi pi-search" :loading="loading"
        @click="load" />
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import BaseMainContent from '@/app/base/components/awMainContent.vue';
import BaseFooter from '@/app/base/components/awFooter.vue';
import awDatePicker from '../components/awDatePicker.vue';
import awInputNumber from '../components/awInputNumber.vue';
import awInputText from '../components/awInputText.vue';
import awMultiSelect from '../components/awMultiSelect.vue';
import awInputPassword from '../components/awInputPassword.vue';
import awSingleSelect from '../components/awSingleSelect.vue';
import awTextArea from '../components/awTextArea.vue';
import awDataTable from '../components/awDataTable.vue';
import awButton from '../components/awButton.vue';
import Button from 'primevue/button';
import { FieldElementItem } from '../models/fieldelementitem';
import AwDataTable from '../components/awDataTable.vue';
import { FieldElement } from '../models/fieldelement';
export default defineComponent({
    name: 'MainLayout',
    components: {
        BaseMainContent,
        BaseFooter,
        awDatePicker,
        awInputNumber,
        awInputText,
        awMultiSelect,
        awInputPassword,
        awSingleSelect,
        awTextArea,
        awDataTable,
        awButton,
        Button
    },
    setup() {
        const loading = ref(false);
        const pageFilter = ref<any>({})
        const callBackFieldElementDatePicker = ref<FieldElementItem>();
        const callBackFieldElementInputNumber = ref<FieldElementItem>();

        const dateElement = ref<FieldElementItem>(new FieldElementItem({
            Name: 'DateElement',
            ShowLabel: false,
            Label: 'DatePicker',
            Required: true,
            FormatValue: 'dd MM yy',
            Disabled: false,
            PlaceHolder: 'DatePicker'
        }));

        const numberElement = ref<FieldElementItem>(new FieldElementItem({
            Name: 'NumberElement',
            ShowLabel: false,
            Label: 'Number',
            Required: true,
            FormatValue: '',
            Disabled: false,
            PlaceHolder: 'NumberElement'
        }));

        const TextElement = ref<FieldElementItem>(new FieldElementItem({
            Name: 'TextElement',
            ShowLabel: false,
            Label: 'Text',
            Required: true,
            Disabled: false,
            PlaceHolder: 'TextElement'
        }));

        const MultiSelectElement = ref<FieldElementItem>(new FieldElementItem({
            Name: 'MultiSelectElement',
            ShowLabel: false,
            Label: 'MultiSelect',
            Required: true,
            Disabled: false,
            PlaceHolder: 'MultiSelect',
            OptionValue: 'Id',
            OptionLabel: 'Name',
            MaxSelectValue: 2
        }));

        const PasswordElement = ref<FieldElementItem>(new FieldElementItem({
            Name: 'PasswordElement',
            ShowLabel: false,
            Label: 'Password',
            Required: true,
            Disabled: false,
            PlaceHolder: 'PasswordElement'
        }));

        const SingleSelectElement = ref<FieldElementItem>(new FieldElementItem({
            Name: 'SingleSelectElement',
            ShowLabel: false,
            Label: 'SingleSelect',
            Required: true,
            Disabled: false,
            PlaceHolder: 'SingleSelect',
            OptionValue: 'Id',
            OptionLabel: 'Name',
            MaxSelectValue: 2
        }));

        const TextAreaElement = ref<FieldElementItem>(new FieldElementItem({
            Name: 'TextAreaElement',
            ShowLabel: false,
            Label: 'TextArea',
            Required: true,
            Disabled: false,
            PlaceHolder: 'TextAreaElement'
        }));

        const DataTableElement = ref<FieldElement>(new FieldElement({
            Name: 'DataTableElement',
            ShowLabel: true,
            Label: 'DataTable',
            Disabled: false,
            Fields: [
                new FieldElementItem({
                    Name: 'Id',
                    Label: 'Id',
                    Visible: true,
                    Type: 'number'
                }),
                new FieldElementItem({
                    Name: 'Name',
                    Label: 'Name',
                    Visible: true,
                    Type: 'text'
                }),
                new FieldElementItem({
                    Name: 'Category',
                    Label: 'Category',
                    Visible: true,
                    Type: 'text'
                }),
                new FieldElementItem({
                    Name: 'CreatedDate',
                    Label: 'Created Date',
                    Visible: true,
                    Type: 'datetime'
                }),
                new FieldElementItem({
                    Name: 'IsDeleted',
                    Label: 'Deleted ?',
                    Visible: true,
                    Type: 'boolean'
                })
            ]
        }));

        const ButtonElement = ref<FieldElementItem>(new FieldElementItem({
            Name: 'ButtonElement',
            Label: 'Button',
            Disabled: false,
            Severity: 'help',
            Variant: 'outlined',
            CustomIcon: 'pi pi-save',
            IconPosition: 'right',
            Raised: true
        }));

        const load = () => {
            loading.value = true;
            dateElement.value.Loading = loading.value;
            numberElement.value.Loading = loading.value;
            TextElement.value.Loading = loading.value;
            MultiSelectElement.value.Loading = loading.value;
            PasswordElement.value.Loading = loading.value;
            TextAreaElement.value.Loading = loading.value;
            SingleSelectElement.value.Loading = loading.value;
            DataTableElement.value.Loading = loading.value;
            ButtonElement.value.Loading = loading.value;
            setTimeout(() => {
                loading.value = false;
                dateElement.value.Loading = loading.value;
                numberElement.value.Loading = loading.value;
                TextElement.value.Loading = loading.value;
                MultiSelectElement.value.Loading = loading.value;
                PasswordElement.value.Loading = loading.value;
                TextAreaElement.value.Loading = loading.value;
                SingleSelectElement.value.Loading = loading.value;
                DataTableElement.value.Loading = loading.value;
                ButtonElement.value.Loading = loading.value;
            }, 2000);
            console.log(PasswordElement);
        };

        const updatePageFilter = (value: any) => {
            console.log('updatePageFilter -> main.form', value);
        }

        const updateCallBackFieldElementDatePicker = (value: any) => {
            console.log('updateCallBackFieldElementDatePicker', value)
        }

        const updateCallBackFieldElementInputNumber = (value: any) => {
            console.log('updateCallBackFieldElementInputNumber', value)
        }

        return { loading, load, dateElement, numberElement, TextElement, MultiSelectElement, PasswordElement, SingleSelectElement, TextAreaElement, ButtonElement, DataTableElement, pageFilter, updatePageFilter, updateCallBackFieldElementDatePicker, updateCallBackFieldElementInputNumber }
    },
});
</script>

<style>
@keyframes slidedown-icon {
    0% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(20px);
    }

    100% {
        transform: translateY(0);
    }
}

.slidedown-icon {
    animation: slidedown-icon;
    animation-duration: 3s;
    animation-iteration-count: infinite;
}
</style>