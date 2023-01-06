<script lang="ts">
	// import { Button, Form } from '$lib/components/forms';
	import IconCheck from '$lib/icons/outline-check.svelte';
	import IconWarning from '$lib/icons/outline-warning.svelte';
	import { assertIsNode, wait } from '$lib/utils/helpers';
	import { createEventDispatcher, onMount } from 'svelte';
	import { quintOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';
	import Button from './Button.svelte';
	import Button2 from './Button2.svelte';
	export let show = false;
	let modal: HTMLElement | null = null; // modal DOM reference
	$: pointerEventsClass = show ? 'pointer-events-auto' : 'pointer-events-none';
	export let affordanceIsButton = true; // toggles between button and text
	export let affordanceButtonLabel = 'Open';
	export let affordanceButtonLevel: 'primary' | 'secondary' | 'tertiary' = 'primary'; // primary, secondary, tertiary
	export let affordanceButtonSize: 'standard' | 'featured' | 'inline' = 'standard'; // featured, standard, inline
	export let affordanceButtonClasses = '';
	export let affordanceText = 'open'; // applicable when affordanceIsButton = false
	export let affordanceTextClasses = 'underline text-action cursor-pointer';
	export let modalHeading = 'Modal Heading';
	export let modalActionLabel = 'Confirm';
	export let modalAction: (() => void) | null = null;
	export let modalAlternativeAction: (() => void) | null = null;
	export let modalAlternativeActionLabel: string | null = null;
	export let modalConfirmAction = true;
	export let modalHasInput = false;
	export let modalIcon = true;
	export let formValid = modalHasInput ? false : true;
	export let danger = false;
	export let errors: string[] | null = null;
	const dispatch = createEventDispatcher();
	const iconBgColorClass = danger ? 'bg-red-50' : 'bg-brand-lightest';
	const modalName = `modal-title-${Math.floor(Math.random() * 10000000)}`;
	const openModal = async () => {
		show = true;
		// when modal opens, focus the first input if it exists
		await wait(100);
		if (modal && modalHasInput) {
			const firstInput = modal.querySelector('input, textarea, select') as HTMLElement;
			if (firstInput) {
				firstInput.classList.add('autofocused');
				firstInput.focus();
			}
		}
		dispatch('opened');
	};
	const closeModal = () => {
		show = false;
		dispatch('closed');
	};
	const actionHandler = () => {
		if (modalAction) modalAction();
		closeModal();
	};
	onMount(() => {
		const outsideModalClickHandler = (event: MouseEvent) => {
			assertIsNode(event.target);
			if (show && !modal?.contains(event.target)) {
				show = false;
			}
		};
		const escapeModalHandler = (event: KeyboardEvent) => {
			if (show && event.key === 'Escape') {
				show = false;
				dispatch('closed');
			}
		};
		// add listeners when element is added to the DOM
		document.addEventListener('click', outsideModalClickHandler, false);
		document.addEventListener('keyup', escapeModalHandler, false);
		// remove listeners when element is removed from the DOM
		return () => {
			document.removeEventListener('click', outsideModalClickHandler, false);
			document.removeEventListener('keyup', escapeModalHandler, false);
		};
	});
</script>

<div bind:this={modal}>
	<div on:click={openModal}>
		{#if affordanceIsButton}
			<Button>{affordanceButtonLabel}</Button>
		{:else}
			<span class={affordanceTextClasses}>{affordanceText} </span>
		{/if}
	</div>
	{#if show}<div
			class="{pointerEventsClass} modal fixed inset-0 z-50 overflow-y-auto"
			aria-labelledby={modalName}
			aria-modal="true"
			role="dialog"
		>
			<div
				class="{pointerEventsClass} flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0"
			>
				<div
					class="shade {pointerEventsClass} fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
					in:scale={{ duration: 300, start: 1, easing: quintOut }}
					out:scale={{ duration: 300, delay: 100, start: 1, easing: quintOut }}
					aria-hidden="true"
					on:click={closeModal}
				/>
				<span class="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true"
					>&#8203;</span
				>
				<div
					class="modal-panel {pointerEventsClass} inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle"
					in:scale={{ duration: 300, delay: 100, start: 0.95, easing: quintOut }}
					out:scale={{ duration: 300, start: 0.95, easing: quintOut }}
				>
					<div>
						{#if modalIcon || danger}<div
								class="{iconBgColorClass} mx-auto flex h-12 w-12 items-center justify-center rounded-full"
							>
								<slot name="icon"
									>{#if danger}<IconWarning />{:else}<IconCheck />{/if}</slot
								>
							</div>{/if}
						<div class="{modalIcon ? 'mt-3 sm:mt-5' : 'mt-1 sm:mt-3'} text-center">
							<h3 class="text-lg font-medium text-gray-900" id={modalName}>{modalHeading}</h3>
							{#if $$slots.content}<div class="mt-4 text-gray-700">
									<slot name="content" />
								</div>
							{/if}

							{#if modalHasInput}
								<!-- <Form
									isValid={formValid}
									submitLabel={modalActionLabel}
									submitHandler={actionHandler}
									dismissible={true}
									dismissHandler={closeModal}
									fullWidthActions={true}
									reverseActionsOrder={true}
									actionsButtonSize="featured"
									actionsClasses="mt-6 sm:mt-8"
									formClasses="text-left"
									formLevelErrors={errors}
									{danger}>
                    <slot name="inputs" />
                </Form> -->
							{/if}

							{#if !modalHasInput}
								<div class="mt-6 sm:mt-8 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
									{#if modalConfirmAction}
										<Button2 label="Cancel" level="secondary" on:click={closeModal} />
									{/if}
									<Button2
										label={modalActionLabel}
										type="submit"
										{danger}
										on:click={actionHandler}
										disabled={!formValid}
									/>
								</div>
							{/if}
						</div>
						{#if modalAlternativeAction}<p
								class="mt-4 mb-1 cursor-pointer text-center font-medium text-action hover:text-action-hover sm:mt-6 sm:mb-2"
								on:click={() => {
									if (modalAlternativeAction) modalAlternativeAction();
								}}
							>
								{modalAlternativeActionLabel}
							</p>{/if}
					</div>
				</div>
			</div>
		</div>{/if}
</div>
