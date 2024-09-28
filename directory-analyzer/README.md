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
* [`selectDirectory()`](#selectdirectory)
* [`loadAudio(...)`](#loadaudio)
* [`playAudio()`](#playaudio)
* [`pauseAudio()`](#pauseaudio)
* [`stopAudio()`](#stopaudio)
* [`seekAudio(...)`](#seekaudio)
* [`skipForward(...)`](#skipforward)
* [`skipBackward(...)`](#skipbackward)
* [`getCurrentPosition()`](#getcurrentposition)
* [`getDuration()`](#getduration)
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


### selectDirectory()

```typescript
selectDirectory() => Promise<SelectDirectoryResult>
```

**Returns:** <code>Promise&lt;<a href="#selectdirectoryresult">SelectDirectoryResult</a>&gt;</code>

--------------------


### loadAudio(...)

```typescript
loadAudio(options: { uri: string; }) => Promise<void>
```

| Param         | Type                          |
| ------------- | ----------------------------- |
| **`options`** | <code>{ uri: string; }</code> |

--------------------


### playAudio()

```typescript
playAudio() => Promise<void>
```

--------------------


### pauseAudio()

```typescript
pauseAudio() => Promise<void>
```

--------------------


### stopAudio()

```typescript
stopAudio() => Promise<void>
```

--------------------


### seekAudio(...)

```typescript
seekAudio(options: { position: number; }) => Promise<void>
```

| Param         | Type                               |
| ------------- | ---------------------------------- |
| **`options`** | <code>{ position: number; }</code> |

--------------------


### skipForward(...)

```typescript
skipForward(options: { milliseconds?: number; }) => Promise<void>
```

| Param         | Type                                    |
| ------------- | --------------------------------------- |
| **`options`** | <code>{ milliseconds?: number; }</code> |

--------------------


### skipBackward(...)

```typescript
skipBackward(options: { milliseconds?: number; }) => Promise<void>
```

| Param         | Type                                    |
| ------------- | --------------------------------------- |
| **`options`** | <code>{ milliseconds?: number; }</code> |

--------------------


### getCurrentPosition()

```typescript
getCurrentPosition() => Promise<{ position: number; }>
```

**Returns:** <code>Promise&lt;{ position: number; }&gt;</code>

--------------------


### getDuration()

```typescript
getDuration() => Promise<{ duration: number; }>
```

**Returns:** <code>Promise&lt;{ duration: number; }&gt;</code>

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

| Prop               | Type                |
| ------------------ | ------------------- |
| **`directoryUri`** | <code>string</code> |


#### SelectDirectoryResult

| Prop               | Type                |
| ------------------ | ------------------- |
| **`directoryUri`** | <code>string</code> |

</docgen-api>
