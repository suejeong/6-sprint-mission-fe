"use client";

import React, { useEffect, useState } from "react";

export default function WriteInput({
	type,
	title,
	placeholder,
	value,
	onChange,
	onKeyUp,
}) {
	return (
		<div className="flex flex-col gap-4 mb-5">
			<div className="text-lg font-[700]">{title}</div>
			<input
				type={type}
				className="w-full bg-gray-100 py-4 px-6 rounded-md"
				placeholder={placeholder}
				onChange={onChange}
				onKeyUp={onKeyUp}
				value={value}
			></input>
		</div>
	);
}
