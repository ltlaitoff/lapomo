<script setup lang="ts">
import { ref } from 'vue'

import { AddNewCategory } from '@entities/Category.ts'
import TrashIcon from '@shared/icons/trash.svg'
import { useCategoryStore } from '@shared/store/categoriesStore.ts'

import CategoryForm from './CategoryForm.vue'

const modalOpened = ref(false)

const categoryStore = useCategoryStore()

function closeModal() {
	modalOpened.value = false
}

function submitForm(payload: AddNewCategory) {
	categoryStore.add(payload)
	modalOpened.value = false
}
</script>

<template>
	<div
		class="pl-6 pr-6 py-6 w-[450px] max-md:pb-6 max-md:w-full h-full flex flex-col gap-y-2 overflow-scroll"
	>
		<div class="text-center text-2xl">{{ $t('category.title') }}</div>

		<div
			v-close-modal="closeModal"
			class="relative"
		>
			<button
				class="border px-4 py-2 bg-white border-slate-400 rounded-xl text-slate-700 hover:bg-slate-100 transition-all duration-200"
				@click="modalOpened = !modalOpened"
			>
				{{ $t('category.add') }}
			</button>

			<CategoryForm
				v-if="modalOpened"
				class="top-12 z-50 bg-white"
				@close="closeModal"
				@submit="submitForm"
			/>
		</div>

		<div class="flex flex-col gap-y-2">
			<div
				v-for="category of categoryStore.categories"
				:key="category._id"
				class="flex justify-between transition-all duration-200"
			>
				<div class="flex gap-x-2 items-center">
					<div
						class="w-3 h-3 rounded-full bg-[--category-panel-bg]"
						:style="{
							'--category-panel-bg': `var(--color-${category.color}-400)`
						}"
					></div>
					<div class="text-lg">{{ category.name }}</div>
				</div>

				<button
					v-if="category._id !== '0'"
					class="group flex items-center justify-center px-2 py-2 rounded-xl hover:bg-slate-100 transition-all duration-200"
					@click="categoryStore.delete(category)"
				>
					<TrashIcon
						class="h-7 w-7 text-slate-100 group-hover:text-red-500 transition-all duration-200"
					/>
				</button>
			</div>
		</div>
	</div>
</template>
<style scoped></style>
