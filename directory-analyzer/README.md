# directory-analyzer

Analyse the content of a directory.

## Install

```bash
npm install directory-analyzer
npx cap sync
```

## API

<docgen-index>

* [`listFilesInDirectory(...)`](#listfilesindirectory)
* [Interfaces](#interfaces)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### listFilesInDirectory(...)

```typescript
listFilesInDirectory(options: ListFilesInDirectoryOptions) => Promise<ListFilesResult>
```

| Param         | Type                                                                                |
| ------------- | ----------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#listfilesindirectoryoptions">ListFilesInDirectoryOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#listfilesresult">ListFilesResult</a>&gt;</code>

--------------------


### Interfaces


#### ListFilesResult

| Prop        | Type                    |
| ----------- | ----------------------- |
| **`files`** | <code>FileInfo[]</code> |


#### FileInfo

| Prop             | Type                |
| ---------------- | ------------------- |
| **`uri`**        | <code>string</code> |
| **`name`**       | <code>string</code> |
| **`mimeType`**   | <code>string</code> |
| **`size`**       | <code>number</code> |
| **`modifiedAt`** | <code>number</code> |


#### ListFilesInDirectoryOptions

| Prop          | Type                |
| ------------- | ------------------- |
| **`fileUri`** | <code>string</code> |

</docgen-api>
