import * as DocumentPicker from 'react-native-document-picker';

async function pickDocument() {
  try {
    const result = await DocumentPicker.pick({
      type: [DocumentPicker.types.allFiles],
    });
    console.log(result);
    // Handle the selected document here
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      // User cancelled the document picker
    } else {
      console.error('Error picking document', err);
    }
  }
}