/**
 * External dependencies
 */
import CodeMirror from 'react-codemirror';
import he from 'he';
require( 'codemirror/mode/javascript/javascript' );
require( 'codemirror/lib/codemirror.css' );

/**
 * Internal dependencies
 */
import { registerBlock, query } from 'api';
const { html } = query;

const toEditor = s => he.decode( s.split( '<br>' ).join( '\n' ) );
const fromEditor = s => he.encode( s, { useNamedReferences: true } ).split( '\n' ).join( '<br>' );

registerBlock( 'core/code', {
	title: wp.i18n.__( 'Code' ),
	icon: 'text',
	category: 'common',
	content: 'just a test',

	attributes: {
		html: html()
	},

	edit( { attributes, setAttributes } ) {
		return (
			<CodeMirror
				value={ toEditor( attributes.html ) }
				mode="javascript"
				onChange={ value => setAttributes( { html: fromEditor( value ) } ) }
				options={ {
					lineNumbers: true,
				} }
			/>
		);
	},

	save( { attributes } ) {
		return attributes.html;
	}
} );
