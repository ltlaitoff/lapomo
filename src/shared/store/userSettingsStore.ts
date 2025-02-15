import { defineStore } from 'pinia'

import { Category } from '@entities/Category.ts'
import { Colors } from '@entities/Colors.ts'
import { Mode } from '@entities/Mode.ts'

import { approachesLimits } from '../constants/approachesLimits'

interface UserSettingsStore {
	settings: {
		colors: Record<Mode, Colors>
		/**
		 * Time in milliseconds
		 */
		times: Record<Mode, number>
		selectedMode: Mode
		selectedCategory: Category
		approachesCount: number
	}
	currentApproach: number
}

export const useUserSettingsStore = defineStore('settings', {
	state(): UserSettingsStore {
		return {
			settings: {
				colors: {
					[Mode.pomodoro]: 'blue',
					[Mode.short]: 'purple',
					[Mode.long]: 'red'
				},
				times: {
					[Mode.pomodoro]: 25 * 60 * 1000,
					[Mode.short]: 5 * 60 * 1000,
					[Mode.long]: 15 * 60 * 1000
				},
				selectedMode: Mode.pomodoro,
				selectedCategory: {
					_id: '0',
					color: 'red',
					mode: 'time',
					name: 'Pomodoro'
				},
				approachesCount: 4
			},
			currentApproach: 1
		}
	},
	getters: {
		colors: state => state.settings.colors,
		times: state => state.settings.times,
		selectedMode: state => state.settings.selectedMode,
		getSelectedModeColor: state =>
			state.settings.colors[state.settings.selectedMode]
	},
	actions: {
		setColor(mode: Mode, color: Colors) {
			this.settings.colors[mode] = color
		},
		setSelectedMode(mode: Mode) {
			this.settings.selectedMode = mode
		},
		setApproachesCount(value: number) {
			if (value > approachesLimits.max || value < approachesLimits.min) return

			this.settings.approachesCount = value
		}
	},
	persist: true
})
