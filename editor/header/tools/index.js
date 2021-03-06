/**
 * External dependencies
 */
import { connect } from 'react-redux';

/**
 * WordPress dependencies
 */
import Dashicon from 'components/dashicon';
import IconButton from 'components/icon-button';
import Button from 'components/button';

/**
 * Internal dependencies
 */
import './style.scss';
import Inserter from '../../inserter';
import PublishButton from './publish-button';
import PreviewButton from './preview-button';
import { isEditorSidebarOpened, hasEditorUndo, hasEditorRedo } from '../../selectors';

function Tools( { undo, redo, hasUndo, hasRedo, isSidebarOpened, toggleSidebar } ) {
	return (
		<div className="editor-tools">
			<IconButton
				className="editor-tools__undo"
				icon="undo"
				label={ wp.i18n.__( 'Undo' ) }
				disabled={ ! hasUndo }
				onClick={ undo } />
			<IconButton
				className="editor-tools__redo"
				icon="redo"
				label={ wp.i18n.__( 'Redo' ) }
				disabled={ ! hasRedo }
				onClick={ redo } />
			<Inserter position="bottom" />
			<div className="editor-tools__tabs">
				<PreviewButton />
				<Button onClick={ toggleSidebar } isToggled={ isSidebarOpened }>
					<Dashicon icon="admin-generic" />
					{ wp.i18n.__( 'Post Settings' ) }
				</Button>
			</div>
			<PublishButton />
		</div>
	);
}

export default connect(
	( state ) => ( {
		hasUndo: hasEditorUndo( state ),
		hasRedo: hasEditorRedo( state ),
		isSidebarOpened: isEditorSidebarOpened( state ),
	} ),
	( dispatch ) => ( {
		undo: () => dispatch( { type: 'UNDO' } ),
		redo: () => dispatch( { type: 'REDO' } ),
		toggleSidebar: () => dispatch( { type: 'TOGGLE_SIDEBAR' } ),
	} )
)( Tools );
